import { Directive, Input, TemplateRef, ViewContainerRef, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[saleProduct]'
})
export class SaleProductDirective {
  @Input() saleProduct: any;
  check: boolean;
  constructor(
    private el: ElementRef,
    private renderer: Renderer) { }

  ngOnInit() {
    this.saleProduct.forEach(e => {
      if (e.discount) {
       this.check = true;
      }
    });
    if (this.check !== true) {
      this.el.nativeElement.setAttribute('style', 'display: none');
    }
  }
}
