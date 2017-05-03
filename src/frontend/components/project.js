import { Injectable }      from '@angular/core';
import { Http }            from '@angular/http';
import { Service }         from './service';
import { Project }         from '../service';

@Injectable()
export class ProjectService extends Service{

  path = 'project'

  constructor(http : Http) {
    super()
    this.http = http
  }

  transform(project) {

  }

}
