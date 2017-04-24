import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Service }    from '../jshttpc/service';

@Injectable()
export class EpicService {
  constructor(http : Http) {
    this.http = http
  }
  getById(id) {
    return this.http.get(`/epic/${id}`)
      .toPromise()
      .then(response => {
        let epic = response.json()
        return epic
      })
  }
  epics = this.hasMany('epic')
}
