import { Component } from '@angular/core';

@Component({
  selector: 'app-view',
  template: `<h1>Bienvenidos a {{name}}</h1>
            <router-outlet></router-outlet>`
})
export class AppComponent {
  constructor() {
    this.name = 'Noticias UNQ'
  }
}
