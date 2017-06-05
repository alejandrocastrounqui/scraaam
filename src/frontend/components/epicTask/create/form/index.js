import { Component }    from '@angular/core';
import { Input }        from '@angular/core';
import { ViewChild }    from '@angular/core';
import { EventEmitter } from '@angular/common/src/facade/async';
import { EpicService }  from '../../../../services/EpicService';
import { Observer }     from '../../../../extra/observer';

@Component({
  selector: 'local-epic-task-create-form',
  template: require('./template.html')
})
export class EpicTaskCreateForm extends Observer{
  @Input() hideActions
  @ViewChild('epicTaskCreateForm') epicTaskCreateForm;
  @ViewChild('descriptionControl') descriptionControl
  constructor(epicService:EpicService) {
    super()
    this.epicService = epicService
    this.data = {}
  }
  ngOnInit() {
    super.ngOnInit()
    this.subscribe(this.epicService.current, current => {
      this.epic = current
    })
  }
  createEpicTask() {
    this.submitted = true
    if(this.epicTaskCreateForm.invalid){
      return this.hideActions && Promise.reject()
    }
    this.processing = true
    let task = {
      description: this.data.description
    }
    return this.epic.addToTasks(task)
      .then(() => {
        this.processing = false
        this.submitted = false
        this.data.description = ''
        setTimeout(()=>{
          this.descriptionControl.nativeElement.focus()
        },1)
      })
  }
}
