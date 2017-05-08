import { Component }         from '@angular/core';
import { Input }             from '@angular/core';
import { ViewChild }         from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ProjectService }    from '../../../../services/ProjectService';

@Component({
  selector: 'local-project-create-form',
  template: require('./template.html')
})
export class ProjectCreateForm {
  @Input() hideActions
  @ViewChild('projectCreateForm') projectCreateForm;
  constructor(projectService:ProjectService, cdRef:ChangeDetectorRef) {
    this.projectService = projectService
    this.cdRef = cdRef
    this.data = {}
  }
  createProject(isKeyAction, fronParent) {
    if(this.hideActions && isKeyAction && !fronParent){return}
    this.submitted = true
    if(this.projectCreateForm.invalid){
      return this.hideActions && Promise.reject()
    }
    this.processing = true
    let data = {
      name: this.data.name
    }
    isKeyAction && this.cdRef.detectChanges();
    return this.projectService.create(data)
      .then((project) =>{
        this.submitted = false
        this.processing = false
        this.data.name = ''
        return project
      })
      .catch((error) =>{
        this.submitted = false
        this.processing = false
        throw error
      })
  }
}
