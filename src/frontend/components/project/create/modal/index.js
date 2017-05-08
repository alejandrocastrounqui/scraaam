import { Component, ViewChild }  from '@angular/core';
import { Router } from '@angular/router'
import { NgbActiveModal }        from '@ng-bootstrap/ng-bootstrap'
import { ProjectCreateForm }     from '../form/index'

@Component({
  selector: 'local-project-create-modal',
  template: require('./template.html')
})
export class ProjectCreateModal {
  @ViewChild(ProjectCreateForm) projectCreateForm: ProjectCreateForm;
  constructor(activeModal: NgbActiveModal, router:Router) {
    this.activeModal = activeModal
    this.router = router
  }
  createProject(isKeyAction){
    let modal = this.activeModal
    this.projectCreateForm.createProject(isKeyAction, true)
    .then((project)=>{
      modal.close()
      this.router.navigateByUrl('/project/' + project.id)
    })
    .catch(()=>{/*do nothing*/})
  }

}
