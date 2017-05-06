import { Injectable }      from '@angular/core';
import { Http }            from '@angular/http';
import { Service }         from './service';
import { ServiceProvider } from './provider';
import Milestone           from '../jshttpc/model/Milestone';

@Injectable()
export class MilestoneService  extends Service{

  constructor(http: Http, serviceProvider:ServiceProvider) {
    super(Milestone, http, serviceProvider)
  }

}
