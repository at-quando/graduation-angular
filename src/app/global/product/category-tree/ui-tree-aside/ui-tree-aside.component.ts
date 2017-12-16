import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscriber} from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ui-tree-aside',
  templateUrl: './ui-tree-aside.component.html',
  styleUrls: ['./ui-tree-aside.component.scss']
})
export class UiTreeAsideComponent implements OnInit {
  @Input('data') mainCategory: any;
  @Input('currentTree') path: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
  }


}
