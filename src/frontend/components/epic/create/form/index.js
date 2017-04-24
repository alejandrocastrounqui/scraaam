import { Component, Input, ViewChild} from '@angular/core';
import { ProjectService }  from '../../../../services/project';
import { Observer }        from '../../../../extra/observer';

@Component({
  selector: 'local-epic-create-form',
  template: require('./template.html')
})
export class EpicCreateForm extends Observer{
  @Input() hideActions
  @ViewChild('epicCreateForm') epicCreateForm;
  constructor(projectService:ProjectService) {
    super()
    this.projectService = projectService
    this.data = {}
  }
  ngOnInit() {
    super.ngOnInit()
    this.subscribe(this.projectService.current, current => {
      this.project = current
    })
  }
  createProject() {
    this.submitted = true
    if(this.epicCreateForm.invalid){
      return this.hideActions && Promise.reject()
    }
    this.processing = true
    let epic = {
      name: this.data.name
    }
    return this.project.addEpic(epic)
      .then(() => {
        this.processing = false
      })
  }
}
