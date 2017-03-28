import { Component, Inject } from '@angular/core';

import { PostService } from '../services/post.service';

@Component({
  selector: 'newPost',
  template: `<form>
                Nueva noticia:
                <input [(ngModel)]="data.title" placeholder="Titulo" name="title">
                <textarea [(ngModel)]="data.content" placeholder="Contenido" name="content"></textarea>

                <button type="button" (click)="onSubmit()">Submit</button>
             <form>`
})
export class NewPostComponent {
  constructor(postService: PostService) {
    this.data = {}
    this.postService = postService
  }

  onSubmit() {
    this.postService.create(this.data)
    this.data = {}
  }
}
