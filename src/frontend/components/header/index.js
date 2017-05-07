import { Component, OnInit, OnDestroy}          from '@angular/core'
import { NgbModal }           from '@ng-bootstrap/ng-bootstrap'
import { ProjectCreateModal } from '../project/create/modal/index'
import { ProjectService }     from '../../services/ProjectService';
import { MilestoneService }   from '../../services/MilestoneService';
import { Observer }           from '../../extra/observer';

@Component({
  selector: 'local-header-view',
  template: require('./template.html')
})
export class HeaderView extends Observer{
  constructor(
    ngbModal: NgbModal,
    projectService:ProjectService,
    milestoneService:MilestoneService
  ) {
    super()
    this.ngbModal = ngbModal
    this.projectService = projectService
    this.milestoneService = milestoneService
    this.project = {}
    this.projects = []
  }
  createProject() {
    this.ngbModal.open(ProjectCreateModal)
  }
  ngOnInit() {
    this.subscribe(this.projectService.current, current => {
      this.project = current
    })
    this.subscribe(this.milestoneService.current, current => {
      this.milestone = current
    })
    this.projectService.getAll()
    .then(projects => {
      this.projects = projects
    })
  }
}
