import 'reflect-metadata'
import 'zone.js'
import 'bootstrap-loader'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { NgbModule }              from '@ng-bootstrap/ng-bootstrap'

import { NgModule }      from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule }   from '@angular/forms'
import { RouterModule }  from '@angular/router'
import { HttpModule }    from '@angular/http'
import 'rxjs/add/operator/toPromise'

import { PostService }         from './services/post'

import { MainView }            from './components/main/index'

import { Dashboard }           from './components/dashboard/index'

import { HeaderView }          from './components/header/index'

import { CommentView }         from './components/comment/index'
import { PostView }            from './components/post/index'
import { PostCreate }          from './components/post/create/index'
import { PostList }            from './components/post/list/index'
import { PostSummary }         from './components/post/summary/index'


import { ProjectService }      from './services/project'

import { ProjectView }         from './components/project/view/index'

import { ProjectCreate }       from './components/project/create/index'
import { ProjectCreateForm }   from './components/project/create/form/index'
import { ProjectCreateModal }  from './components/project/create/modal/index'


let routes = [{
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },{
    path: 'dashboard',
    component: Dashboard
  },{
    path: 'project/:projectId',
    component: ProjectView
  },{
    path: 'noticias',
    component: PostList
  },{
    path: 'noticia/:id',
    component: PostView
}];

let routerOptions = {
  useHash: true
}

let router = RouterModule.forRoot(routes, routerOptions)

@NgModule({
  imports: [
    router,
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  styleUrls: [
    './style.css'
  ],
  declarations: [
    MainView,
    HeaderView,
    Dashboard,
    CommentView,
    PostView,
    PostCreate,
    PostList,
    PostSummary,
    ProjectView,
    ProjectCreate,
    ProjectCreateForm,
    ProjectCreateModal
  ],
  providers: [
    PostService,
    ProjectService
  ],
  entryComponents: [
    ProjectCreateModal
  ],
  bootstrap: [
    MainView
  ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
