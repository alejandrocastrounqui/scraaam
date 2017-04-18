import { Component } from '@angular/core';

@Component({
  selector: 'local-comment-view',
  inputs: [ 'data' ],
  template: require('./template.html')
})
export class CommentView {

}
