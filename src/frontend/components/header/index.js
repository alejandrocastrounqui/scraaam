import { Component }          from '@angular/core'
import { OnInit }             from '@angular/core'
import { OnDestroy }          from '@angular/core'
import { NgbModal }           from '@ng-bootstrap/ng-bootstrap'
import { ProjectCreateModal } from '../project/create/modal/index'
import { ProjectService }     from '../../services/ProjectService';
import { MilestoneService }   from '../../services/MilestoneService';
import { EpicService }        from '../../services/EpicService';
import { Observer }           from '../../extra/observer';

@Component({
  selector: 'local-header-view',
  template: require('./template.html')
})
export class HeaderView extends Observer{
  constructor(
    ngbModal: NgbModal,
    projectService:ProjectService,
    milestoneService:MilestoneService,
    epicService:EpicService
  ) {
    super()
    this.ngbModal = ngbModal
    this.projectService = projectService
    this.milestoneService = milestoneService
    this.epicService = epicService
    this.projects = []
  }
  createProject() {
    this.ngbModal.open(ProjectCreateModal)
  }
  ngOnInit() {
    super.ngOnInit()
    this.subscribe(this.projectService.creation, newer => {
      if(!newer){
        return
      }
      this.projects.push(newer)
    })
    this.subscribe(this.projectService.current, current => {
      this.project = current
    })
    this.subscribe(this.milestoneService.current, current => {
      this.milestone = current
    })
    this.subscribe(this.epicService.current, current => {
      this.epic = current
    })
    this.projectService.getAll()
    .then(projects => {
      this.projects.splice(0, this.projects.length, ...projects)
    })
  }
}
