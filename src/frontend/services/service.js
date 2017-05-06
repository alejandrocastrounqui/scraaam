import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Angular2Service } from '../jshttpc/angular2service';

export class Service extends Angular2Service{

  constructor(model, http, serviceProvider) {
    super(model, serviceProvider)
    this.http = http
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
      this.getById(nextId).then(instance => {
      if(nextRetrive.cancell){return}
      this._current.next(instance)
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
}
