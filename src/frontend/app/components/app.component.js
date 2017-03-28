import { Component } from '@angular/core';

import { PostService } from '../services/post.service';

@Component({
  selector: 'app-view',
  template: `<h1>Bienvenidos a {{name}}</h1>
            <post *ngFor="let item of posts" [data]="item"></post>
            <newPost></newPost>`
})
export class AppComponent {
  constructor(postService: PostService) {
    this.name = 'Noticias UNQ',
    this.posts = postService.post;
    postService.observePost(() => {
      this.posts = postService.posts
    })
  }
}
