import { Component }        from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { ProjectService }   from '../services/ProjectService';
import { MilestoneService } from '../services/MilestoneService';
import { EpicService }      from '../services/EpicService';
import { Observer }         from '../extra/observer';

@Component({
  template: '<local-epic-view></local-epic-view>'
})
export class EpicRoute extends Observer{

  constructor(
    route: ActivatedRoute,
    projectService:ProjectService,
    milestoneService:MilestoneService,
    epicService:EpicService
  ) {
    super()
    this.route = route
    this.projectService = projectService
    this.milestoneService = milestoneService
    this.epicService = epicService
  }

  ngOnInit() {
    super.ngOnInit()
    this.subscribe(this.milestoneService.current, milestone => {
      this.milestone = milestone
      if(milestone){
        this.projectService.currentId = milestone.projectId
      }
    })
    this.subscribe(this.epicService.current, epic => {
      this.epic = epic
      if(epic){
        this.milestoneService.currentId = epic.milestoneId
      }
    })
    this.subscribe(this.route.params, params => {
      this.epicService.currentId = params.epicId
    });

  }

}
