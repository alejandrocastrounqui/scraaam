
const extend = function(src, dest){
  for(let attrName in src){
    dest[attrName] = src[attrName]
  }
  return dest;
}

const transfer = function(attrName){
  return null
}

const capitalize = function(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

const mapper = {
  string: function(){ return {
    process: function(localCTX){
      localCTX.transforms.afterRetrive
      .push(function(local, response){
        local[localCTX.mappingName] = response[localCTX.mappingName]
      })
      localCTX.transforms.beforeCreate
      .push(function(local, data){
        local[localCTX.mappingName] = data[localCTX.mappingName]
      })
      localCTX.transforms.beforeUpdate
      .push(function(request, local){
        request[localCTX.mappingName] = local[localCTX.mappingName]
      })
    }
  }},
  date: function(defaultKeyOrValue){ return {
    process: function(localCTX){

    }
  }},
  hasMany: function(modelName, config={}){
    const relatedAs = config.as || modelName.toUpperCase()
    return {
      process: function(localCTX){
        localCTX.modelPrototipe['addTo'+capitalize(localCTX.mappingName)] = function(data){
          data[relatedAs] = this
          let relatedService = localCTX.service.getModelService(modelName)
          return relatedService.create(data).then((related)=>{
            this[localCTX.mappingName+'Ids'].push(related.id)
            return related
          })
        }
        localCTX.transforms.afterRetrive
        .push(function(local, response){
          local[localCTX.mappingName+'Ids'] = response[localCTX.mappingName]
        })
        localCTX.transforms.afterCreate
        .push(function(local){
          local[localCTX.mappingName+'Ids'] = []
        })
        localCTX.transforms.beforeUpdate
        .push(function(request, local){
          request[localCTX.mappingName] = local[localCTX.mappingName+'Ids']
        })
      }
    }
  },
  hasOne: function(modelName){ return {
    process: function(localCTX){

    }
  }},
  belongsTo: function(modelName){return {
    process: function(localCTX){
      localCTX.transforms.afterRetrive
      .push(function(local, response){
        local[localCTX.mappingName+'Id'] = response[localCTX.mappingName]
        delete local[localCTX.mappingName]
      })
      localCTX.transforms.beforeCreate
      .push(function(local, data){
        if(!data[localCTX.mappingName+'Id'] && data[localCTX.mappingName]){
          local[localCTX.mappingName] = data[localCTX.mappingName].id
        }
        else{
          local[localCTX.mappingName] = data[localCTX.mappingName+'Id']
        }
      })
      localCTX.transforms.afterCreate
      .push(function(local){
        local[localCTX.mappingName+'Id'] = local[localCTX.mappingName]
      })
      localCTX.transforms.beforeUpdate
      .push(function(request, local){
        request[localCTX.mappingName] = local[localCTX.mappingName]
      })
    }
  }}
}



export class Angular2Service{

  constructor(model) {
    const schema = model(mapper)
    this._cache = {}
    const resourcePath = schema.resourcePath || schema.name.toLowerCase()
    const transforms = {
      afterRetrive: [],
      beforeUpdate: [],
      beforeCreate: [],
      afterCreate:  []
    }
    const modelPrototipe = {}
    const defaultsCTX = {modelPrototipe, resourcePath, transforms, service: this}
    for(let mappingName in schema.mapping){
      let mapper = schema.mapping[mappingName]
      let localCTX = extend(defaultsCTX, {mappingName})
      mapper.process(localCTX)
    }
    this.modelName = schema.name
    this.resourcePath = resourcePath
    this.transforms = transforms
    this.modelPrototipe = modelPrototipe
  }

  get creation() {
    return this._creation
  }

  getModelService (modelName){
    return this.provider.getModelService(modelName)
  }

  afterRetrive(local, response){
    local.id = response._id
    local.__proto__ = this.modelPrototipe
    this.transforms.afterRetrive
    .forEach(transform => transform(local, response))
  }
  beforeUpdate(request, local){
    request._id = request.id
    this.transforms.beforeUpdate
    .forEach(transform => transform(request, local))
  }
  beforeCreate(local, data){
    this.transforms.beforeCreate
    .forEach(transform => transform(local, data))
  }
  afterCreate(local){
    local.__v = 0
    local.__proto__ = this.modelPrototipe
    this.transforms.afterCreate
    .forEach(transform => transform(local))
  }

  getById(id) {
    const inCache = this._cache[id]
    if(inCache){
      if(inCache.then){
        return inCache
      }
      return Promise.resolve(inCache)
    }
    let promise = new Promise((resolve, reject)=>{
      this.http.get(`/${this.resourcePath}/${id}`).toPromise().then(response => {
      let local = {}
      this.afterRetrive(local, response.json())
      this._cache[id] = local
      resolve(local)
    })})
    this._cache[id] = promise
    return promise
  }
  create(data) {
    let local = {}
    this.beforeCreate(local, data)
    return this.http.post(`/${this.resourcePath}`, local)
      .toPromise()
      .then(response => {
        local.id = response.json()
        this._cache[local.id] = local
        this.afterCreate(local)
        return local
      })
  }
  getRelated(instance, attrName, service) {
    return this.http.get(`/${this.resourcePath}/${project.id}/${attrName}`)
      .toPromise()
      .then(response => {
        let asJson = response.json()
        project.milestonesList = milestones
        return milestones
      })
  }
  addRelated(instance, attrName, rawList) {
    return this.http.get(`/${this.resourcePath}/${project.id}/${attrName}`)
      .toPromise()
      .then(response => {
        let relatedIds = response.json()
        for(let index = 0, length = relatedIds.length; index < length; index ++){
          milestone._id = response.json()[0]
          milestone.__v = 0
        }
        project.milestonesList = relatedIds
        return milestones
      })
  }
}
