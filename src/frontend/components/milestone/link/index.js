import { Component, Input } from '@angular/core';
import { MilestoneService } from '../../../services/MilestoneService';

@Component({
  selector: 'local-milestone-link',
  template: require('./template.html')
})
export class MilestoneLink {
  @Input() milestoneId
  constructor(milestoneService:MilestoneService) {
    this.milestoneService = milestoneService
  }
  ngOnInit() {
    this.milestoneService.getById(this.milestoneId)
    .then(milestone => {
      this.milestone = milestone
    })
  }

  ngOnDestroy() {

  }

}
