import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Service }  from '../jshttpc/service';

@Injectable()
export class MilestoneService  extends Service{
  constructor(http : Http) {
    super()
    this.http = http
  }
  
  path = 'milestones'

  epics = this.hasMany('epic')
}
