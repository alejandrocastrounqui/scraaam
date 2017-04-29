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
    project.milestonesIds = project.milestones
    project.milestones = []
    project.getMilestones = () => this.getMilestones(project)
    project.addMilestone = (milestone) => this.addMilestone(project, milestone)
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
  }
  getMilestones(project) {
    if(project.milestonesLoaded){
      return Promise.resolve(project.milestones)
    }
    return this.http.get(`/project/${project.id}/milestones`)
      .toPromise()
      .then(response => {
        project.milestonesLoaded = true
        let milestones = response.json()
        //TODO: consolidar con cache
        for(let index = 0, length = milestones.length; index < length; index ++){
          milestones[index].id = milestones[index]._id
        }
        project.milestones.splice(0, project.milestones.length, ...milestones)
        return milestones
      })
  }
  addMilestone(project, milestone) {

    return this.http.post(`/project/${project.id}/milestones` , [milestone])
      .toPromise()
      .then(response => {
        milestone.id = response.json()[0]
        milestone.__v = 0
        if(project.milestones){
          project.milestones.push(milestone)
        }
        return milestone
      })
  }

}
