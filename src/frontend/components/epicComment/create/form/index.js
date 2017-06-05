import { Component }    from '@angular/core';
import { Input }        from '@angular/core';
import { ViewChild }    from '@angular/core';
import { EventEmitter } from '@angular/common/src/facade/async';
import { EpicService }  from '../../../../services/EpicService';
import { Observer }     from '../../../../extra/observer';

@Component({
  selector: 'local-epic-comment-create-form',
  template: require('./template.html')
})
export class EpicCommentCreateForm extends Observer{
  @Input() hideActions
  @ViewChild('epicCommentCreateForm') epicCommentCreateForm;
  @ViewChild('bodyControl') bodyControl
  constructor(epicService:EpicService) {
    super()
    this.epicService = epicService
    this.data = {}
  }
  ngOnInit() {
    super.ngOnInit()
    this.subscribe(this.epicService.current, current => {
      this.epic = current
    })
  }
  createEpicComment() {
    this.submitted = true
    if(this.epicCommentCreateForm.invalid){
      return this.hideActions && Promise.reject()
    }
    this.processing = true
    let comment = {
      body: this.data.body
    }
    return this.epic.addToComments(comment)
      .then(() => {
        this.processing = false
        this.submitted = false
        this.data.body = ''
        setTimeout(()=>{
          this.bodyControl.nativeElement.focus()
        },1)
      })
  }
}
