import { Component }        from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { ProjectService }   from '../services/ProjectService';
import { MilestoneService } from '../services/MilestoneService';
import { Observer }         from '../extra/observer';

@Component({
  template: `<local-project-view></local-project-view>`
})
export class MilestoneRoute extends Observer{

  constructor(route: ActivatedRoute, projectService:ProjectService, milestoneService:MilestoneService) {
    super()
    this.route = route
    this.projectService = projectService
    this.milestoneService = milestoneService
  }

  ngOnInit() {
    super.ngOnInit()

    this.subscribe(this.milestoneService.current, milestone => {
      this.milestone = milestone
      if(milestone){
        this.projectService.currentId = milestone.projectId
      }
    })
    this.subscribe(this.route.params, params => {
      this.milestoneService.currentId = params.milestoneId
    });

  }

}
