import { Component }        from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { ProjectService }   from '../../services/project';
import { MilestoneService } from '../../services/milestone';
import { Observer }         from '../../extra/observer';

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
    this.subscribe(this.projectService.current, project => {
      if(project && !this.milestoneService.currentId){
        this.milestoneService.currentId = project.milestones[0]
      }
    })
    this.subscribe(this.route.params, params => {
      this.projectService.currentId = params.projectId
    });
  }

}
