import { Component }        from '@angular/core';
import { Input }            from '@angular/core';
import { ViewChild }        from '@angular/core';
import { MilestoneService } from '../../../../services/MilestoneService';
import { ProjectService }   from '../../../../services/ProjectService';
import { Observer }         from '../../../../extra/observer';

@Component({
  selector: 'local-milestone-create-form',
  template: require('./template.html')
})
export class MilestoneCreateForm extends Observer{
  @Input() hideActions
  @ViewChild('milestoneCreateForm') milestoneCreateForm;
  @ViewChild('nameControl') nameControl
  constructor(
    milestoneService:MilestoneService,
    projectService:ProjectService
  ) {
    super()
    this.milestoneService = milestoneService
    this.projectService = projectService
    this.data = {}
  }
  ngOnInit() {
    super.ngOnInit()
    this.subscribe(this.projectService.current, current => {
      this.project = current
    })
  }
  createMilestone() {
    this.submitted = true
    if(this.milestoneCreateForm.invalid){
      return this.hideActions && Promise.reject()
    }
    this.processing = true
    return this.project.addToMilestones(this.data)
      .then(() => {
        this.processing = false
        this.submitted = false
        this.data.name = ''
        this.data.description = ''
        setTimeout(()=>{
          this.nameControl.nativeElement.focus()
        },1)
      })
  }
}
