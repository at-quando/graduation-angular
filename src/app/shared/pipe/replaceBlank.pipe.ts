import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'replaceBlankSpace' })
export class ReplaceBlankPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let replaceBlankSpace = value;
    var res = replaceBlankSpace.toLowerCase().replace(/ /g, "");
    var res = res.replace(/&/g, "and");
    var res = res.replace(/'s/g, "is");
    return res;
  }
}
