import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'percent' })
export class PercentPipe implements PipeTransform {
  transform(value): any {
    let key: string;
    if ( value !== 0) {
      key = (value * 100).toFixed(2) + '%';
    }
    else {
      return '';
    }
    return key;
  }
}
