import 'reflect-metadata'
import 'zone.js'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import 'rxjs/add/operator/toPromise'

import { PostService } from './app/services/post.service'
import { AppComponent } from './app/components/app.component'
import { PostComponent } from './app/components/post.component'
import { NewPostComponent } from './app/components/newPost.component'

@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule ],
  styleUrls: ['./style.css'],
  declarations: [
    PostComponent,
    NewPostComponent,
    AppComponent
  ],
  providers: [ PostService ],
  bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
