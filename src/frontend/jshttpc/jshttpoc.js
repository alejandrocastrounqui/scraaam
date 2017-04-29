import { Injectable }      from '@angular/core';
import { Http }            from '@angular/http';
import { Service }         from '../jshttpc/service';

@Injectable()
export class JsHttpOC extends Service{

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

}
