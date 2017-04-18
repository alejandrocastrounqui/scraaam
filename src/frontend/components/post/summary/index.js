import { Component } from '@angular/core';

@Component({
  selector: 'local-post-summary',
  inputs: [ 'data' ],
  template: require('./template.html')
})
export class PostSummary {

}
