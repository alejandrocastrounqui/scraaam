import { Injectable }      from '@angular/core';
import { Http }            from '@angular/http';
import { Service }         from './Service';
import Milestone           from '../jshttpc/model/Milestone';

@Injectable()
export class MilestoneService  extends Service{

  constructor(http: Http) {
    super(Milestone, http)
  }

}
