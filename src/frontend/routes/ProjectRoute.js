import { Component }        from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { ProjectService }   from '../services/ProjectService';
import { MilestoneService } from '../services/MilestoneService';
import { Observer }         from '../extra/observer';

@Component({
  template: `<local-project-view></local-project-view>`
})
export class ProjectRoute extends Observer{

  constructor(route: ActivatedRoute, projectService:ProjectService, milestoneService:MilestoneService) {
    super()
    this.route = route
    this.projectService = projectService
    this.milestoneService = milestoneService
  }

  ngOnInit() {
    super.ngOnInit()
    let localProject
    this.subscribe(this.projectService.current, project => {
      if(project && project != localProject){
        this.milestoneService.currentId = project.milestonesIds[0]
      }
    })
    this.subscribe(this.route.params, params => {
      this.projectService.currentId = params.projectId
    });
  }

}
