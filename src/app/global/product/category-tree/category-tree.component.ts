import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { AppService } from '../../../app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss'],
})
export class CategoryTreeComponent implements OnInit {
  categories: any;
  mainCategory: any;
  sub: any;
  check: any;
  name: any;
  currentObj: any;
  path: any;
  currentObjTitle: any;

  constructor(private route: ActivatedRoute, private app: AppService) {
    this.check = 0;
    this.path = '';
  }

  ngOnInit() {
    if (this.check == 0) {
      this.sub = this.route.params.subscribe(params => {
        this.name = params['name'];
        this.app.getAllCategories().subscribe(
        data => {
          if (data!=[]) {
            this.categories = data;
            this.mainCategory = this.findNodeInBranch(this.categories['category']);
            this.paths(this.mainCategory, this.name);
          }
        },
          err => console.log('cant get data', err.status, err.url),
          () => console.log('Get complete')
        );
      });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  findNodeInBranch(obj) {
    this.check = 0;
    for (var k in obj) {
      this.scan(obj[k], this.name);
      if (this.check == 1) {
        return obj[k];
      }
    }
  }


  paths(root, name) {
    let paths = [];
    let nodes = [{
      obj: root,
      path: []
    }];
    while (nodes.length > 0) {
      let n = nodes.pop();
      let path;
      Object.keys(n.obj).forEach(k => {
        let path;
        if (typeof n.obj[k] === 'object') {
          if (n.obj[k].title) {
            path = n.path.concat(n.obj[k].title);
            if (n.obj[k].title.toLowerCase() == name) {
              this.path = path;
            }
          }
          else {
            path = n.path.concat(k);
            if (k.toLowerCase() == name) {
              this.path = path;
            }
          }
          paths.push(path);
          nodes.unshift({
            obj: n.obj[k],
            path: path
          });
        }
      });
    }
  }

  scan(obj, name) {
    var k;
    if (typeof obj === 'object') {
      for (k in obj) {
        if (obj.hasOwnProperty(k)) {
          if (obj[k].title) {
            if (obj[k].title.toLowerCase() == name) {
              this.check = 1;
              this.currentObj = obj[k];
              return obj[k];
            }
          }
          else {
            if (k.toLowerCase() == name) {
              this.check = 1;
              this.currentObj = obj[k];
              return obj[k];
            }
            this.scan(obj[k], name);
          }
        }
      }
    }
  }
}
