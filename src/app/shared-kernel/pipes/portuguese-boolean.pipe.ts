import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'portugueseBoolean'
})
export class PortugueseBooleanPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): unknown {
    return value?"sim":"não";
  }

}
