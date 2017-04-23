import { Component, Input } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { MilestoneService } from '../../../services/milestone';

@Component({
  selector: 'local-milestone-view',
  template: require('./template.html')
})
export class MilestoneView {
  @Input() project
  constructor(route: ActivatedRoute, milestoneService:MilestoneService) {
    this.route = route
    this.project = {}
    this.milestoneService = milestoneService
  }
  ngOnInit() {
    var controller = this
    this.handler = this.route.params.subscribe(params => {
      console.log(params)
      console.log(params['id'])
      console.log(params['milestoneId'])
      if(params.milestoneId){
        this.milestoneService.getById(params.milestoneId)
        .then(rawMilestone =>{
          controller.milestone = rawMilestone
        })
        .catch(e => console.log(e));
      }
    });
  }

  ngOnDestroy() {
    console.log('ondestroy')
    this.handler.unsubscribe();
  }

}
