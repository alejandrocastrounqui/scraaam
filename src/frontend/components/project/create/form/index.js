import { Component, Input, ViewChild} from '@angular/core';
import { Router } from '@angular/router'
import { ProjectService }  from '../../../../services/project';

@Component({
  selector: 'local-project-create-form',
  template: require('./template.html')
})
export class ProjectCreateForm {
  @Input() hideActions
  @ViewChild('projectCreateForm') projectCreateForm;
  constructor(projectService:ProjectService, router:Router) {
    this.projectService = projectService
    this.router = router
    this.data = {}
  }
  createProject() {
    this.submitted = true
    if(this.projectCreateForm.invalid){
      return this.hideActions && Promise.reject()
    }
    this.processing = true
    let project = {
      name: this.data.name
    }
    return this.projectService.create(project)
      .then(() =>{
        this.router.navigateByUrl('/project/' + project.id)
      })
  }
}
