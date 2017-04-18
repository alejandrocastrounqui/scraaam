import { Component }      from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/project';

@Component({
  selector: 'local-project-view',
  template: require('./template.html')
})
export class ProjectView {

  constructor(route: ActivatedRoute, projectService:ProjectService) {
    this.route = route
    this.projectService = projectService
  }
  ngOnInit() {
    var controller = this
    this.handler = this.route.params.subscribe(params => {
      console.log(params)
      console.log(params['id'])
      console.log(params['projectId'])
      /*
      if(params.projectId){
        this.projectService.getById(params.projectId)
        .then(rawProject =>{
          projectsPromise.then(projects =>{
            for(let index = 0; index < projects.length; index++){
              if(projects[index] == rawProject){
                console.log(rawProject);
                controller.project = projects[index]
                return
              }
            }
          })
        })
        .catch(e => console.log(e));
      }
      */
    });
  }

  ngOnDestroy() {
    console.log('ondestroy')
    this.handler.unsubscribe();
  }

}
