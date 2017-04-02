import 'reflect-metadata'
import 'zone.js'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { RouterModule }  from '@angular/router';
import { HttpModule } from '@angular/http'
import 'rxjs/add/operator/toPromise'

import { PostService } from './app/services/post.service'

import { AppComponent }        from './app/components/app.component'
import { CommentComponent }    from './app/components/comment.component'
import { NewPostComponent }    from './app/components/newPost.component'
import { PostComponent }       from './app/components/post.component'
import { PostDetailComponent } from './app/components/postDetail.component'
import { PostListComponent }   from './app/components/postList.component'


let router = RouterModule.forRoot([
  { path: '', redirectTo: '/noticias', pathMatch: 'full' },
  { path: 'noticias', component: PostListComponent },
  { path: 'noticia/:id', component: PostDetailComponent }
], { useHash: true })

@NgModule({
  imports: [
    router,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  styleUrls: ['./style.css'],
  declarations: [
    AppComponent,
    CommentComponent,
    NewPostComponent,
    PostComponent,
    PostDetailComponent,
    PostListComponent
  ],
  providers: [
    PostService
  ],
  bootstrap: [
    AppComponent
  ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
