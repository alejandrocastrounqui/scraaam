import { Component} from '@angular/core';

import { PostService } from '../../../services/post';

@Component({
  selector: 'local-post-create',
  template: require('./template.html')
})
export class PostCreate {
  constructor(postService: PostService) {
    this.data = {}
    this.postService = postService
  }

  onSubmit() {
    this.postService.create(this.data)
    this.data = {}
  }
}
