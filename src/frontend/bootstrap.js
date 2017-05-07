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

import { FocusDirective }      from './directives/focus'

import { MainView }            from './components/main/index'

import { Dashboard }           from './components/dashboard/index'

import { HeaderView }          from './components/header/index'

import { ProjectService }      from './services/ProjectService'
import { MilestoneService }    from './services/MilestoneService'
import { EpicService }         from './services/EpicService'
import { EpicTaskService }     from './services/EpicTaskService'
import { EpicCommentService }  from './services/EpicCommentService'

import { ProjectRoute }        from './routes/ProjectRoute'
import { MilestoneRoute }      from './routes/MilestoneRoute'
import { EpicRoute }           from './routes/EpicRoute'

import { ProjectView }         from './components/project/view/index'
import { ProjectCreateForm }   from './components/project/create/form/index'
import { ProjectCreateModal }  from './components/project/create/modal/index'

import { MilestoneLink }       from './components/milestone/link/index'
import { MilestoneDetail }     from './components/milestone/detail/index'
import { MilestoneCreate }     from './components/milestone/create/index'
import { MilestoneCreateForm } from './components/milestone/create/form/index'

import { EpicLink }            from './components/epic/link/index'
import { EpicView }            from './components/epic/view/index'
import { EpicCreate }          from './components/epic/create/index'
import { EpicCreateForm }      from './components/epic/create/form/index'

import { EpicTaskLink }        from './components/epicTask/link/index'
import { EpicTaskCreate }      from './components/epicTask/create/index'
import { EpicTaskCreateForm }  from './components/epicTask/create/form/index'

let routes = [{
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },{
    path: 'dashboard',
    component: Dashboard
  },{
    path: 'project/:projectId',
    component: ProjectRoute,
  },{
    path: 'milestone/:milestoneId',
    component: MilestoneRoute
  },{
    path: 'epic/:epicId',
    component: EpicRoute
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
    ProjectRoute,
    MilestoneRoute,
    EpicRoute,
    ProjectView,
    ProjectCreateForm,
    ProjectCreateModal,
    MilestoneLink,
    MilestoneDetail,
    MilestoneCreate,
    MilestoneCreateForm,
    EpicView,
    EpicLink,
    EpicCreate,
    EpicCreateForm,
    EpicTaskLink,
    EpicTaskCreate,
    EpicTaskCreateForm,
    FocusDirective
  ],
  providers: [
    ProjectService,
    MilestoneService,
    EpicService,
    EpicTaskService,
    EpicCommentService
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
