import { Component} from '@angular/core';
import { PostService } from '../../../services/post';

@Component({
  selector: 'local-post-list',
  template: require('./template.html')
})
export class PostList {
  constructor(postService: PostService) {
    this.posts = postService.posts;
  }
}
