import { Component, Input, ViewChild} from '@angular/core';
import { ProjectService }  from '../../../../services/project';
import { Observer }        from '../../../../extra/observer';

@Component({
  selector: 'local-milestone-create-form',
  template: require('./template.html')
})
export class MilestoneCreateForm extends Observer{
  @Input() hideActions
  @ViewChild('milestoneCreateForm') milestoneCreateForm;
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
    if(this.milestoneCreateForm.invalid){
      return this.hideActions && Promise.reject()
    }
    this.processing = true
    let milestone = {
      name: this.data.name
    }
    return this.project.addMilestone(milestone)
      .then(() => {
        this.processing = false
        this.submitted = false
        this.data.name = ''
      })
  }
}
