import { Component }        from '@angular/core';
import { ProjectService }   from '../../../services/ProjectService';
import { MilestoneService } from '../../../services/MilestoneService';
import { Observer }         from '../../../extra/observer';

@Component({
  selector: 'local-project-view',
  template: require('./template.html')
})
export class ProjectView extends Observer{

  constructor(projectService:ProjectService, milestoneService:MilestoneService) {
    super()
    this.projectService = projectService
    this.milestoneService = milestoneService
  }

  ngOnInit() {
    super.ngOnInit()
    this.subscribe(this.projectService.current, project => {
      this.project = project
      if(project && !this.milestoneService.currentId){
        this.milestoneService.currentId = project.milestonesIds[0]
      }
    })
  }

}
