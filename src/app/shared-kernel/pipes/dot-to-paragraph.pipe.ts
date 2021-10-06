import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dotToParagraph',
  pure: true
})
export class DotToParagraphPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return "<p>" + value.replace(/\./g,"</p><p>") + "</p>";


  }

}
