import { PipeTransform, Pipe } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'momentConvert' })
export class MomentPipe implements PipeTransform {
  transform(value, args: string[]): any {
    return moment(value).fromNow();
  }
}
