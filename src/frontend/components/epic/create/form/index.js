import { Component, Input, ViewChild} from '@angular/core';
import { MilestoneService }  from '../../../../services/MilestoneService';
import { Observer }        from '../../../../extra/observer';

@Component({
  selector: 'local-epic-create-form',
  template: require('./template.html')
})
export class EpicCreateForm extends Observer{
  @Input() hideActions
  @ViewChild('epicCreateForm') epicCreateForm;
  @ViewChild('nameControl') nameControl
  constructor(milestoneService:MilestoneService) {
    super()
    this.milestoneService = milestoneService
    this.data = {}
  }
  ngOnInit() {
    super.ngOnInit()
    this.subscribe(this.milestoneService.current, current => {
      this.milestone = current
    })
  }
  createEpic() {
    this.submitted = true
    if(this.epicCreateForm.invalid){
      return this.hideActions && Promise.reject()
    }
    this.processing = true
    return this.milestone.addToEpics(this.data)
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
