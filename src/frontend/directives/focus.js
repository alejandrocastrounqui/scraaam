import { Directive } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer } from '@angular/core';
import { Inject } from '@angular/core';

@Directive({
  selector: '[focus]'
})
export class FocusDirective {
  @Input('focus') focusEvent: EventEmitter;

  constructor(element: ElementRef, renderer: Renderer) {
    this.element = element
    this.renderer = renderer
  }

  ngOnInit() {
    // this.focusEvent.subscribe(event => {
    //   setTimeout(()=>{
    //     this.renderer.invokeElementMethod(this.element.nativeElement, 'focus', [])
    //   },1)
    // });
  }

}
