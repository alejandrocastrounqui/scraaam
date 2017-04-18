import { Component }      from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService }    from '../../services/post';


@Component({
  selector: 'local-post-view',
  inputs: [ 'post' ],
  template: require('./template.html')
})
export class PostView {

  constructor(route: ActivatedRoute, postService:PostService) {
    this.route = route
    this.postService = postService
  }
  ngOnInit() {
    this.post = {}
    this.route.params.subscribe(params => {
      //cuando algo un parametro cambia
      this.postService.getPost(params.id)
          .then(post => this.post = post)
          .catch(e => console.log(e));
    });
  }

}
