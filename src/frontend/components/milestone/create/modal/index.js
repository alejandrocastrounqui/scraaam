import { Component, ViewChild }  from '@angular/core';
import { NgbActiveModal }        from '@ng-bootstrap/ng-bootstrap'
import { ProjectCreateForm }     from '../form/index'

@Component({
  selector: 'local-project-create-modal',
  template: require('./template.html')
})
export class ProjectCreateModal {
  @ViewChild(ProjectCreateForm) projectCreateForm: ProjectCreateForm;
  constructor(activeModal: NgbActiveModal) {
    this.activeModal = activeModal
  }
  createProject(){
    let modal = this.activeModal
    this.projectCreateForm.createProject()
      .then(()=>{
        modal.close()
      })
      .catch(()=>{
        console.log('do nothing')
      })
  }

}
