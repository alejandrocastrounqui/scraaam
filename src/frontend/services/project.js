import { Injectable }      from '@angular/core';
import { Http }            from '@angular/http';
import { Service }         from '../jshttpc/service';

@Injectable()
export class ProjectService extends Service{

  path = 'project'

  constructor(http : Http) {
    super()
    this.http = http
  }

  transform(project) {
    super.transform(project)
    project.getMilestones = () => this.getMilestones(project)
  }

  getAll() {
    return this.http.get(`/project`)
      .toPromise()
      .then(response => {
        let projects = response.json()
        for(let index = 0, length = projects.length; index < length; index ++){
          let id = projects[index]._id
          let inCache = this._cache[id]
          if(inCache){
            projects[index] = inCache
          }
          else{
            this.transform(projects[index])
            this._cache[id] = projects[index]
          }
        }
        return projects
      })
      .catch(err => console.log(err))
  }
  getMilestones(project) {
    console.log('getting  milestones from: ' + project.name)
    return this.http.get(`/project/${project.id}/milestones`)
      .toPromise()
      .then(response => {
        let milestones = response.json()
        project.milestonesList = milestones
        return milestones
      })
      .catch(err => console.log(err))
  }
  addMilestone(project, milestone) {
    return this.http.post(`/project/${project.id}/milestones` , JSON.stringify([milestone]))
      .toPromise()
      .then(response => {
        milestone.id = response.json()[0]
        milestone.__v = 0
        if(project.milestonesList){
          project.milestonesList.push(milestone)
        }
        return milestone
      })
      .catch(err => console.log(err))
  }

}
