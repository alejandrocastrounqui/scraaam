import { Component, Input } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { EpicService } from '../../../services/epic';

@Component({
  selector: 'local-epic-view',
  template: require('./template.html')
})
export class EpicView {
  @Input() project
  constructor(route: ActivatedRoute, epicService:EpicService) {
    this.route = route
    this.project = {}
    this.epicService = epicService
  }
  ngOnInit() {
    var controller = this
    this.handler = this.route.params.subscribe(params => {
      console.log(params)
      console.log(params['id'])
      console.log(params['epicId'])
      if(params.epicId){
        this.epicService.getById(params.epicId)
        .then(rawEpic =>{
          controller.epic = rawEpic
        })
        .catch(e => console.log(e));
      }
    });
  }

  ngOnDestroy() {
    console.log('ondestroy')
    this.handler.unsubscribe();
  }

}
