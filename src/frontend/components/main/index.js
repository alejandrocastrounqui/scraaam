import { Component }          from '@angular/core';
import { Angular2Provider }   from '../../jshttpc/angular2provider';
import { ProjectService }     from '../../services/ProjectService';
import { MilestoneService }   from '../../services/MilestoneService';
import { EpicService }        from '../../services/EpicService';
import { EpicTaskService }    from '../../services/EpicTaskService';
import { EpicCommentService } from '../../services/EpicCommentService';


@Component({
  selector: 'local-main-view',
  template: require('./template.html')
})
export class MainView {
  constructor(
    projectService: ProjectService,
    milestoneService: MilestoneService,
    epicService: EpicService,
    epicTaskService: EpicTaskService,
    epicCommentService: EpicCommentService
  ) {
    let angular2provider = new Angular2Provider();
    angular2provider.declare(projectService)
    angular2provider.declare(milestoneService)
    angular2provider.declare(epicService)
    angular2provider.declare(epicTaskService)
    angular2provider.declare(epicCommentService)
  }
}
