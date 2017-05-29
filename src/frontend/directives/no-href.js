import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer } from '@angular/core';

@Directive({
  selector: '[no-href]'
})
export class NoHrefDirective {

  constructor(elementRef: ElementRef, renderer: Renderer) {
    this.elementRef = elementRef
    this.renderer = renderer
  }

  ngOnInit() {
    this.elementRef.nativeElement.href = '#'
    this.renderer.listen(this.elementRef.nativeElement, 'click', (event) => {
      event.preventDefault()
      event.stopPropagation();
      return false
    })
  }

}
