import { Component} from '@angular/core';

import { PostService } from '../services/post.service';

@Component({
  selector: 'postList',
  template: `
            <post *ngFor="let item of posts" [data]="item" [routerLink]="['/noticia', item._id]"></post>
            <newPost></newPost>
            `
})
export class PostListComponent {
  constructor(postService: PostService) {
    this.posts = postService.posts;
  }
}
