import { Component }    from '@angular/core';
import { EpicService }  from '../../../services/EpicService';
import { Observer }     from '../../../extra/observer';

@Component({
  selector: 'local-epic-detail',
  template: require('./template.html')
})
export class EpicDetail extends Observer{
  constructor(epicService:EpicService) {
    super()
    this.epicService = epicService
  }
  ngOnInit() {
    super.ngOnInit()
    this.subscribe(this.epicService.current, epic => {
      if(this.epic === epic){
        return
      }
      this.epic = epic
    })
  }

}
