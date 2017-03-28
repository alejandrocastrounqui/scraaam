import { Component } from '@angular/core';

@Component({
  selector: 'post',
  inputs: [ 'data' ],
  template: `<article>
              <header>{{data.title}}</header>
              {{data.content}}
              <footer>por {{data.author}} - {{data.upvotes}}</footer>
            </article>`
})
export class PostComponent {
  
}
