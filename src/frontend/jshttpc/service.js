import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Service{

  constructor() {
    this._cache = {}
    this._current = new BehaviorSubject()
    this._creation = new BehaviorSubject()
  }
  get current() {
    return this._current
  }
  set currentId(nextId) {
    if(nextId){
      this.getById(nextId)
        .then( project => this._current.next(project) )
    }
    else{
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
      return Promise.resolve(inCache)
    }
    return this.http.get(`/${this.path}/${id}`)
      .toPromise()
      .then(response => {
        const inCache = this._cache[id]
        if(inCache){
          return inCache
        }
        let instance = response.json()
        this.transform(instance)
        return instance
      })
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
