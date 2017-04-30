import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Service{

  constructor() {
    this._cache = {}
    this._currentId = null;
    this._currentRetrive = {};
    this._current = new BehaviorSubject()
    this._creation = new BehaviorSubject()
  }
  get current() {
    return this._current
  }
  get currentId() {
    return this._currentId
  }
  set currentId(nextId) {
    if(this._currentId == nextId) {return}
    this._currentId = nextId
    this._currentRetrive.cancell = true;
    let nextRetrive = {}
    this._currentRetrive = nextRetrive
    if(nextId){
      this._currentId = nextId
      this.getById(nextId).then(project => {
      if(nextRetrive.cancell){return}
      this._current.next(project)
    })}
    else{
      this._currentRetrive.cancell = true;
      this._currentRetrive = {}
      this.current.next()
    }
  }
  get creation() {
    return this._creation
  }
  transform(instance){
    instance.id = instance._id
    delete instance._id
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
      this.http.get(`/${this.path}/${id}`).toPromise().then(response => {
      let instance = response.json()
      this.transform(instance)
      this._cache[id] = instance
      resolve(instance)
    })})
    this._cache[id] = promise
    return promise
  }
  beforeCreate(raw) {}
  afterCreate(instance) {}
  create(raw) {
    this.beforeCreate(raw)
    return this.http.post(`/${this.path}`, raw)
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
    return this.http.get(`/${this.path}/${project.id}/${attrName}`)
      .toPromise()
      .then(response => {
        let asJson = response.json()
        project.milestonesList = milestones
        return milestones
      })
  }
  addRelated(instance, attrName, rawList) {
    return this.http.get(`/${this.path}/${project.id}/${attrName}`)
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
