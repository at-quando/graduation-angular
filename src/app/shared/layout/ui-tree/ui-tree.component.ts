import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-ui-tree',
  templateUrl: './ui-tree.component.html',
  styleUrls: ['./ui-tree.component.scss']

})
export class UiTreeComponent implements OnInit {
  @Input('data') obj: any;
  @Input('key') key: string;
  constructor() { }

  ngOnInit() {
  }

  scanLevel(obj) {

  }
}
