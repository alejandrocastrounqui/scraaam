import { Component } from '@angular/core';
import { ProjectService }   from '../../services/ProjectService';
import { MilestoneService } from '../../services/MilestoneService';
import { EpicService }      from '../../services/EpicService';

@Component({
  selector: 'local-dashboard-view',
  template: require('./template.html')
})
export class Dashboard{

  constructor(
    projectService:ProjectService,
    milestoneService:MilestoneService,
    epicService:EpicService
  ) {
    this.projectService = projectService
    this.milestoneService = milestoneService
    this.epicService = epicService
  }

  ngOnInit() {
    this.projectService.currentId = null
    this.milestoneService.currentId = null
    this.epicService.currentId = null
  }
}
