import { Injectable }      from '@angular/core';
import { Http }            from '@angular/http';
import { Service }         from './Service';
import EpicTask            from '../jshttpc/model/EpicTask';

@Injectable()
export class EpicTaskService  extends Service{

  constructor(http: Http) {
    super(EpicTask, http)
  }

}
