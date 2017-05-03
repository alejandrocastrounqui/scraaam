
const extend = function(src, dest){
  for(let attrName in src){
    dest[attrName] = src[attrName]
  }
  return dest;
}

const mapper = {
  string: function(){
    return {
      fromResponse: function(localCTX){
        return function(local, response){
          local[localCTX.mappingName] = response[localCTX.mappingName]
        }
      }
    }
  },
  date: function(defaultKeyOrValue){

  },
  hasMany: function(modelName){
    return {
      fromResponse: function(localCTX){
        return function(local, response){
          local[localCTX.mappingName] = response[localCTX.mappingName]
        }
      }
    }
  },
  hasOne: function(modelName){

  },
  belongsTo: function(modelName){
    return {
      fromResponse: function(localCTX){
        return function(local, response){
          local[localCTX.mappingName] = response[localCTX.mappingName]
        }
      },
      constructor: function(localCTX){

      },
      beforeCreate: function(localCTX){

      },
      afterCreate: function(localCTX){
        return function(local, remote){
          local[localCTX.mappingName] = remote[localCTX.mappingName]
        }
      }
    }
  }
}



export class Angular2Service{

  constructor(model) {
    this._cache = {}
    const schema = model(mapper)
    const resourcePath = schema.resourcePath || schema.name.toLowerCase()
    this.resourcePath = resourcePath
    this.fromResponseTransforms = []
    this.toRequestTransforms = []
    const defaultsCTX = {resourcePath, service: this}
    for(let mappingName in schema.mapping){
      let mapper = schema.mapping[mappingName]
      let localCTX = extend(defaultsCTX, {mappingName})
      if(mapper.constructor){
        mapper.constructor(localCTX)
      }
      if(mapper.fromResponse){
        this.fromResponseTransforms.push(mapper.fromResponse(localCTX))
      }
      if(mapper.toRequest){
        this.toRequestTransforms.push(mapper.toRequest(localCTX))
      }
    }
  }

  get creation() {
    return this._creation
  }

  fromResponse(local, request){
    local.id = request._id
    this.fromResponseTransforms.forEach(transform =>{
      transform(local, request)
    })
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
      this.fromResponse(local, response.json())
      this._cache[id] = local
      resolve(local)
    })})
    this._cache[id] = promise
    return promise
  }
  beforeCreate(raw) {}
  afterCreate(instance) {}
  create(raw) {
    this.beforeCreate(raw)
    return this.http.post(`/${this.resourcePath}`, raw)
      .toPromise()
      .then(response => {
        const id = response.json()
        const instance = raw
        instance._id = id
        instance.__v = 0
        this.transform(instance)
        this.afterCreate(instance)
        this._cache[id] = instance
        return instance
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
  hasMany(repositoryName){
    console.log('hasMany: ' +repositoryName)
  }
}
