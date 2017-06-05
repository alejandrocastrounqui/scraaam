import { Component }          from '@angular/core';
import { ActivatedRoute }     from '@angular/router';
import { EpicService }        from '../../../services/EpicService';
import { EpicCommentService } from '../../../services/EpicCommentService';
import { Observer }           from '../../../extra/observer';

@Component({
  selector: 'local-epic-view',
  template: require('./template.html')
})
export class EpicView extends Observer{

  constructor(
    route: ActivatedRoute,
    epicService:EpicService,
    epicCommentService:EpicCommentService
  ) {
    super()
    this.route = route
    this.epicService = epicService
    this.epicCommentService = epicCommentService
  }
  ngOnInit() {
    super.ngOnInit()
    this.subscribe(this.epicService.current, epic => {
      this.epic = epic
      if(epic && !this.epicCommentService.currentId){
        this.epicCommentService.currentId = epic.commentsIds[0]
      }
    })
  }



}
