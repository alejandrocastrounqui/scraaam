import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Service }  from '../jshttpc/service';

@Injectable()
export class MilestoneService  extends Service{

  path = 'milestone'

  constructor(http : Http) {
    super()
    this.http = http
  }

}
