import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, size: number = 15) {
    if (value.length > size) {
      return value.substr(0, size) + ' ...';
    } else {
      return value;
    }
  }
}
