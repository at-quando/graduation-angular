import { Directive, Input, TemplateRef, ViewContainerRef, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[saleProductDetails]'
})
export class SaleProductDetailsDirective {
  @Input() saleProductDetails: any;
  check: boolean;
  constructor(
    private el: ElementRef,
    private renderer: Renderer) { }

  ngOnInit() {
    this.saleProductDetails.forEach(e => {
      if (e.discount) {
       this.check = true;
      }
    });
    if (this.check === true) {
      this.el.nativeElement.setAttribute('style', 'display: block');
    }
  }
}
