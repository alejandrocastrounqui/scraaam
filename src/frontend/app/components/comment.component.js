import { Component } from '@angular/core';

@Component({
  selector: 'comment',
  inputs: [ 'data' ],
  template: `<div class="comment">
              {{data.body}} <span class="author">{{data.author}}</span>
            </div>`
})
export class CommentComponent {

}
