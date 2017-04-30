import { Component } from '@angular/core';
import { MilestoneService } from '../../../services/milestone';
import { Observer }         from '../../../extra/observer';

@Component({
  selector: 'local-milestone-detail',
  template: require('./template.html')
})
export class MilestoneDetail extends Observer{
  constructor(milestoneService:MilestoneService) {
    super()
    this.milestoneService = milestoneService
  }
  ngOnInit() {
    super.ngOnInit()
    this.subscribe(this.milestoneService.current, milestone => {
      if(this.milestone == milestone){ return }
      this.milestone = milestone
    })
  }

}
