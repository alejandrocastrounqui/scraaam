import mongoose from 'mongoose'
import express from 'express'

const mongooseMapper = {
  string: function(){
    return String
  },
  date: function(defaultKeyOrValue){
    if(defaultKeyOrValue == 'now'){
      return { type: Date, default: Date.now }
    }
    if(defaultKeyOrValue){
      return { type: Date, default: defaultKeyOrValue }
    }
    return { type: Date }
  },
  hasMany: function(modelName){
    return [{ type: mongoose.Schema.Types.ObjectId, ref: modelName }]
  },
  hasOne: function(modelName){
    return { type: mongoose.Schema.Types.ObjectId, ref: modelName }
  },
  belongsTo: function(modelName){
    return { type: mongoose.Schema.Types.ObjectId, ref: modelName }
  }
}

const noop = function(){return {}}

const routeMapper = {
  string: noop,
  date: noop,
  hasMany: function(relatedModelName){
    return {}
  },
  hasOne: function(relatedModelName){
    return {}
  },
  belongsTo: function(relatedModelName, relatedAttrName){
    return {
      beforeCreate: function(localCTX){return function(){
        const relatedId = localCTX.raw[localCTX.routerMappingName]
        if(!relatedId){
          return Promise.reject(`it is not allowed to create ${localCTX.schema.name} whitout related ${localCTX.routerMappingName} id`)
        }
        let relatedModel = localCTX.mongoCon.getModel(relatedModelName)
        return relatedModel.findById(relatedId)
        .then(relatedInstance => {
          if (!relatedInstance) {
            throw new Error(`${relatedModelName} id:${relatedId} not found`)
          }
          localCTX.relatedInstance = relatedInstance
          localCTX.instance[localCTX.routerMappingName] = relatedInstance
        })
      }},
      afterCreate: function(localCTX){ return function(){
        localCTX.relatedInstance[relatedAttrName].push(localCTX.instance)
        return relatedInstance.save()
      }}
    }
  }
}

const extend = function(src, dest){
  for(let attrName in src){
    dest[attrName] = src[attrName]
  }
  return dest;
}

const routerIdParam = function(defaultsCTX){
  let model = defaultsCTX.mongoCon.getModel(defaultsCTX.schema.name)
  defaultsCTX.router.param('id', (req, res, next, id) => {
    model.findById(id)
      .then(instance => {
        if (! instance ) {
          throw new Error(`${ctx.localModelName} instance with id:${id} not found`)
        }
        req.instance = instance
        next()
      })
      .catch(next)
  })
}

const routerGetAll = function(defaultsCTX){
  let model = defaultsCTX.mongoCon.getModel(defaultsCTX.schema.name)
  let routePath = '/'+defaultsCTX.resourcePath
  defaultsCTX.router.get(routePath, (req, res, next) => {
    model.find()
      .then(instances => res.json(instances))
      .catch(next)
  })
}

const routerGetById = function(defaultsCTX){
  let model = defaultsCTX.mongoCon.getModel(defaultsCTX.schema.name)
  let routePath = '/'+defaultsCTX.resourcePath+'/:id'
  defaultsCTX.router.get(routePath, (req, res, next) => res.json(req.instance))
}

const routerPostCreate = function(defaultsCTX){
  let model = defaultsCTX.mongoCon.getModel(defaultsCTX.schema.name)
  let routePath = '/'+defaultsCTX.resourcePath
  defaultsCTX.router.post(routePath, (req, res, next) => {
    const raw = req.body
    const instance = new model(raw)
    let routerMappings = defaultsCTX.schema.router.mapping
    let beforeCreate = []
    let afterCreate = []
    for(let routerMappingName in routerMappings){
      let routerMapping = routerMappings[routerMappingName]
      if(!routerMapping.beforeCreate && !routerMapping.afterCreate){continue}
      let localCTX = extend(defaultsCTX, {routerMappingName, instance, raw})
      if(routerMapping.beforeCreate){
        beforeCreate.push(routerMapping.beforeCreate(localCTX))
      }
      if(routerMapping.afterCreate){
        afterCreate.shift(routerMapping.afterCreate(localCTX))
      }
    }
    let resolved = Promise.resolve()
    let before = beforeCreate.reduce(((previus, next)=>previus.then(next)), resolved)
    let actual = before.then(function(){
      return instance.save()
    })
    let after = afterCreate.reduce(((previus, next)=>previus.then(next)), actual)
    let last = after.then(function(){
      res.json(instance.id)
    })
    last.catch(next)
  })

}

const routeDefaults = function(defaultsCTX){
  routerIdParam(defaultsCTX)
  routerGetAll(defaultsCTX)
  routerGetById(defaultsCTX)
  routerPostCreate(defaultsCTX)
}

const makeRoutes = function(conCTX){
  const resourcePath = conCTX.schema.resourcePath || conCTX.schema.name.toLowerCase()
  const defaultsCTX = extend(conCTX, {resourcePath})
  routeDefaults(defaultsCTX)
  let mapping = conCTX.schema.router.mapping
  for(let mappingName in mapping){
    let routeCTX = extend(defaultsCTX, {attributeName: mappingName})
  }
}

export default class MongoCon{

  constructor(){
    this.schemas = {}
  }

  process(schemaConstructor){
    const schema = schemaConstructor(mongooseMapper)
    schema.router = schemaConstructor(routeMapper)
    schema.model = mongoose.model(schema.name, schema.mapping)
    return schema
  }

  load(schemaConstructor){
    if(this.schemas[schemaConstructor.name]){
      throw new Error('cannot load twise model with same name: ' + schemaConstructor.name)
    }
    const schema = this.process(schemaConstructor)
    console.log('loading schema: ' + schema.name)
    this.schemas[schema.name] = schema
  }

  makeRoutes(globalRouter){
    for(let modelName in this.schemas){
      console.log('processing routes: ' + modelName)
      let schema = this.schemas[modelName]
      let router = express.Router()
      var conCTX = {schema, router, mongoCon: this}
      makeRoutes(conCTX)
      globalRouter.use(router)
    }
  }

  getModel(modelName){
    return this.schemas[modelName].model
  }

}
