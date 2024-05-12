import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipes'
})
export class PipesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): any {

    if (args[0] == "dd") {
      value = new Date().getDate();
    } else if (args[0] == "MM") {
      value = new Date().getMonth()+1;
    } else if (args[0] == "yyyy") {  
      value = new Date().getFullYear();
    } else if (args[0] == "HH") {  
      value = new Date().getHours();
    }
    return value;
  }
}