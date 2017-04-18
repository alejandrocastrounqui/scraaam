import { Component, Input, ViewChild} from '@angular/core';
import { ProjectService }  from '../../../../services/project';

@Component({
  selector: 'local-project-create-form',
  template: require('./template.html')
})
export class ProjectCreateForm {
  @Input() hideActions
  @ViewChild('projectCreateForm') projectCreateForm;
  constructor(projectService:ProjectService) {
    this.projectService = projectService
    this.data = {}
  }
  createProject() {
    this.submitted = true
    if(this.projectCreateForm.invalid){
      console.log('formulario invalido')
      return
    }
    this.processing = true
    
    console.log('formulario valido', this.data, this)
  }
}
