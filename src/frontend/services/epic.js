import { Injectable }      from '@angular/core';
import { Http }            from '@angular/http';
import { Service }         from './service';
import { ServiceProvider } from './provider';
import Epic                from '../jshttpc/model/Epic';

@Injectable()
export class EpicService  extends Service{

  constructor(http: Http, serviceProvider:ServiceProvider) {
    super(Epic, http, serviceProvider)
  }

}
