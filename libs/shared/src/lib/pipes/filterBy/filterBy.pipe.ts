import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  standalone: true,
})
export class FilterByPipe implements PipeTransform {
  transform(options: any[], filterValue: any, filterField: string): any[] {
    if (!options || !filterValue || !filterField) {
      return options;
    }

    return options.filter((option) => option[filterField] === filterValue);
  }
}
