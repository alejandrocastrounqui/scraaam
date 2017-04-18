import { Component, OnInit, OnDestroy}          from '@angular/core'
import { NgbModal }           from '@ng-bootstrap/ng-bootstrap'
import { ActivatedRoute }     from '@angular/router';
import { ProjectCreateModal } from '../project/create/modal/index'
import { ProjectService }     from '../../services/project';

@Component({
  selector: 'local-header-view',
  template: require('./template.html')
})
export class HeaderView {
  constructor(ngbModal: NgbModal, route: ActivatedRoute, projectService:ProjectService) {
    this.ngbModal = ngbModal
    this.route = route
    this.projectService = projectService
  }
  createProject() {
    this.ngbModal.open(ProjectCreateModal)
  }
  ngOnInit() {
    var controller = this
    var projectsPromise = this.projectService.getAll()
      .then(projects =>{
        controller.projects = projects
      })

  }
  ngOnDestroy() {
    
  }
}
