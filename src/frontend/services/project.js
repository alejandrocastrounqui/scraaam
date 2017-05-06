import { Injectable }      from '@angular/core';
import { Http }            from '@angular/http';
import { Service }         from './service';
import { ServiceProvider } from './provider';
import Project             from '../jshttpc/model/Project';

@Injectable()
export class ProjectService extends Service{

  constructor(http: Http, serviceProvider:ServiceProvider) {
    super(Project, http, serviceProvider)
  }

  getAll() {
    return this.http.get(`/project`)
    .toPromise()
    .then(response => {
      let projects = response.json()
      for(let index = 0, length = projects.length; index < length; index ++){
        let id = projects[index]._id
        let inCache = this._cache[id]
        if(inCache){
          if(inCache.then){
            projects[index] = null;
            (index=>{
              inCache.then(project=>{
                projects[index] = project
              })
            })(index)
          }
          else{
            projects[index] = inCache
          }
        }
        else{
          this.afterRetrive(projects[index], projects[index])
          this._cache[id] = projects[index]
        }
      }
      return projects
    })
  }

}
