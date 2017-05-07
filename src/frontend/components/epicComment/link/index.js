import { Component, Input } from '@angular/core';
import { EpicService } from '../../../services/EpicService';

@Component({
  selector: 'local-epic-link',
  template: require('./template.html')
})
export class EpicLink {
  @Input() epicId
  constructor(epicService:EpicService) {
    this.epicService = epicService
  }

  ngOnInit() {
    this.epicService.getById(this.epicId)
    .then(epic => {
      this.epic = epic
    })
  }

  ngOnDestroy() {

  }

}
