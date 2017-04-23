import { Component, Input } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { ProjectService }   from '../../../services/project';
import { Observer }         from '../../../extra/observer';

@Component({
  selector: 'local-milestone-list',
  template: require('./template.html')
})
export class MilestoneList extends Observer{
  @Input() project
  constructor(route: ActivatedRoute, projectService:ProjectService) {
    super()
    this.route = route
    this.project = {}
    this.projectService = projectService
    this.milestones = []
  }
  ngOnInit() {
    super.ngOnInit()
    this.subscribe(this.projectService.current, project => {
      if(this.project == project){ return }
      this.project = project
      if(!project.id){ return }
      project.getMilestones().then(milestones => {
        let length = this.milestones.length
        this.milestones.splice(0, length, ...milestones)
      })
    })

  }

}
