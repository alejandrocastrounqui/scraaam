import { Component }      from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/project';
import { Observer }       from '../../../extra/observer';

@Component({
  selector: 'local-project-view',
  template: require('./template.html')
})
export class ProjectView extends Observer{

  constructor(route: ActivatedRoute, projectService:ProjectService) {
    super()
    this.route = route
    this.project = {}
    this.projectService = projectService
  }

  ngOnInit() {
    super.ngOnInit()
    this.subscribe(this.projectService.current, project => {
      this.project = project
    })
    this.subscribe(this.route.params, params => {
      this.projectService.currentId = params.projectId
    });
  }
  ngOnDestroy() {
    super.ngOnDestroy()
    this.projectService.currentId = null
  }

}
