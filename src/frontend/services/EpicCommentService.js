import { Injectable }      from '@angular/core';
import { Http }            from '@angular/http';
import { Service }         from './Service';
import EpicComment            from '../jshttpc/model/EpicComment';

@Injectable()
export class EpicCommentService  extends Service{

  constructor(http: Http) {
    super(EpicComment, http)
  }

}
