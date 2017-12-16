import { Directive, Input, TemplateRef, ViewContainerRef, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appNavUser]'
})
export class NavUserDirective {
  @Input() appNavUser: any;
  splitInfo: any;
  constructor(
    private el: ElementRef,
    private renderer: Renderer) { }

  ngOnInit() {
    if (this.appNavUser.name) {
      var _child = this.el.nativeElement.children[0];
      var __child = this.el.nativeElement.children[0].children[0];
      var ___child = this.el.nativeElement.children[0].children[1];
      _child.removeChild(__child);
      let image = this.renderer.createElement(_child, 'img');
      _child.insertBefore(image, ___child)
      if(this.appNavUser.avatar == null) {
        image.setAttribute('src', 'http://santetotal.com/wp-content/uploads/2014/05/default-user.png');
      }
      else if(this.appNavUser.avatar.includes('https://')) {
        image.setAttribute('src', this.appNavUser.avatar);
      }
      else {
        image.setAttribute('src', 'http://res.cloudinary.com/asian-tech/image/upload/c_fill,g_faces,h_30,w_30/' +  this.appNavUser.avatar);
      }
      image.setAttribute('class', 'rounded-circle');
      image.setAttribute('width', '30px');
      image.setAttribute('deight', '30px');
      let insteadElm = this.renderer.createElement(this.el.nativeElement, 'span');
      this.renderer.setElementClass(insteadElm, 'text-empty', true);
      insteadElm.innerHTML = "Hello " + this.appNavUser.name;
      var child = this.el.nativeElement.childNodes[1];
      child.insertBefore(insteadElm, child.childNodes[1]);
      var DropDown = <HTMLInputElement>document.getElementById('dropdown-user');
      var DropDownLogin = <HTMLInputElement>document.getElementById('dropdown-user-login');
      DropDown.style.display = "none";
      DropDownLogin.style.display = "block";
    }
    else {
      // let insteadElm = this.renderer.createElement(this.el.nativeElement.parentNode, 'span');
      // this.renderer.setElementClass(insteadElm,'text-empty', true);
      // insteadElm.innerHTML= "empty";
      // var parent = this.el.nativeElement.parentNode;
      // parent.insertBefore(insteadElm,this.el.nativeElement);
      // this.el.nativeElement.remove();
    }
  }
}
