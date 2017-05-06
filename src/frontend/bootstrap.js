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

import { MainView }            from './components/main/index'

import { Dashboard }           from './components/dashboard/index'

import { HeaderView }          from './components/header/index'



import { ServiceProvider }     from './services/provider'

import { ProjectService }      from './services/project'
import { MilestoneService }    from './services/milestone'
import { EpicService }         from './services/epic'

import { ProjectRoute }        from './routes/project/index'
import { MilestoneRoute }      from './routes/milestone/index'

import { ProjectView }         from './components/project/view/index'
import { ProjectCreateForm }   from './components/project/create/form/index'
import { ProjectCreateModal }  from './components/project/create/modal/index'

import { MilestoneLink }       from './components/milestone/link/index'
import { MilestoneDetail }     from './components/milestone/detail/index'
import { MilestoneCreate }     from './components/milestone/create/index'
import { MilestoneCreateForm } from './components/milestone/create/form/index'

import { EpicView }            from './components/epic/view/index'
import { EpicList }            from './components/epic/list/index'
import { EpicCreate }          from './components/epic/create/index'
import { EpicCreateForm }      from './components/epic/create/form/index'



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
    ProjectView,
    ProjectCreateForm,
    ProjectCreateModal,
    MilestoneLink,
    MilestoneDetail,
    MilestoneCreate,
    MilestoneCreateForm,
    EpicView,
    EpicList,
    EpicCreate,
    EpicCreateForm
  ],
  providers: [
    ServiceProvider,
    ProjectService,
    MilestoneService,
    EpicService
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
