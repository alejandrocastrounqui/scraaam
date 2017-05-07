import { Component, Input } from '@angular/core';
import { EpicTaskService }  from '../../../services/EpicTaskService';

@Component({
  selector: 'local-epic-task-link',
  template: require('./template.html')
})
export class EpicTaskLink {
  @Input() epicTaskId
  constructor(epicTaskService:EpicTaskService) {
    this.epicTaskService = epicTaskService
  }

  ngOnInit() {
    this.epicTaskService.getById(this.epicTaskId)
    .then(epicTask => {
      this.epicTask = epicTask
    })
  }

  ngOnDestroy() {

  }

}
