import { Component, Input } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { ProjectService }   from '../../../services/project';
import { Observer }         from '../../../extra/observer';

@Component({
  selector: 'local-epic-list',
  template: require('./template.html')
})
export class EpicList extends Observer{
  @Input() project
  constructor(route: ActivatedRoute, projectService:ProjectService) {
    super()
    this.route = route
    this.projectService = projectService
  }
  ngOnInit() {
    super.ngOnInit()
    this.subscribe(this.projectService.current, project => {
      if(this.project == project){ return }
      this.project = project
      if(!project){ return }
      project.getEpics()
    })

  }

}
