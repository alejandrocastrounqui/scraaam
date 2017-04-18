import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ProjectService {
  constructor(http : Http) {
    this.http = http
  }
  getById(id) {
    return this.http.get(`/project/${id}`)
      .toPromise()
      .then(response => {
        return response.json()
      })
      .catch(err => console.log(err))
  }
  getAll() {
    return this.http.get(`/project`)
      .toPromise()
      .then(response => {
        return response.json()
      })
      .catch(err => console.log(err))
  }
  getMilestones(id) {
    return this.http.get(`/project/${id}/milestones`)
      .toPromise()
      .then(response => {
        return response.json()
      })
      .catch(err => console.log(err))
  }
  addMilestone(id, milestone) {
    return this.http.patch(`/project/${id}/milestones`)
      .toPromise()
      .then(response => {
        milestone.id = response.json()
        milestone.__v = 0
        return milestone
      })
      .catch(err => console.log(err))
  }
  create(project) {
    this.http.post("/project", JSON.stringify(project), {headers:{'Content-Type': 'application/json'}})
      .toPromise()
      .then(response => {
        project._id = response.json()
        project.__v = 0
        return project
      })
      .catch(err => console.log(err))
  }
}
