import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'convertToZero' })
export class NullPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let key: number;
    if (value === 'underfined') {
      key = 0;
    }
    return key;
  }
}
