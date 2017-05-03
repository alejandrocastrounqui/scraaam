import { Injectable }  from '@angular/core';
import { Http }        from '@angular/http';
import { Service }     from './service';
import Epic            from '../jshttpc/model/Epic';

@Injectable()
export class EpicService  extends Service{

  constructor(http : Http) {
    super(Epic, http)
  }

}
