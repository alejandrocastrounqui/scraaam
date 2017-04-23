import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Service }  from '../jshttpc/service';

@Injectable()
export class MilestoneService {
  constructor(http : Http) {
    this.http = http
  }
  getById(id) {
    return this.http.get(`/milestone/${id}`)
      .toPromise()
      .then(response => {
        let project = response.json()
        return project
      })
      .catch(err => console.log(err))
  }
  epics = this.hasMany('epic')
}
