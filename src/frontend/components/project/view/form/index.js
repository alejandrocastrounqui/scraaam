import { Component} from '@angular/core';

import { ProjectService } from '../../../services/project';

@Component({
  selector: 'local-project-create-form',
  template: require('./template.html')
})
export class PostCreate {
  constructor(projectService: ProjectService) {
    this.data = {}
    this.projectService = projectService
  }

  onSubmit() {
    this.projectService.create(this.data)
    this.data = {}
  }
}
