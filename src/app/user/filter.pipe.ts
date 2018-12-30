import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString : string, propName : string): any {
    if(value === 0 || filterString === ''){
      return value;
    }
    const resultArray = [];
    for(const index of value){
      if(index[propName] === filterString){
        resultArray.push(index);
      }
    }

    return resultArray;
  }

}
