import { Component, Input }    from '@angular/core';
import { EpicCommentService }  from '../../../services/EpicCommentService';

@Component({
  selector: 'local-epic-comment-link',
  template: require('./template.html')
})
export class EpicCommentLink {
  @Input() epicCommentId
  constructor(epicCommentService:EpicCommentService) {
    this.epicCommentService = epicCommentService
  }

  ngOnInit() {
    this.epicCommentService.getById(this.epicCommentId)
    .then(epicComment => {
      this.epicComment = epicComment
    })
  }

  ngOnDestroy() {

  }

}
