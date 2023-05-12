import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      // Modify this condition to match your filtering logic
      //filter by lastName and firstName
      return (
        item.lastName.toLowerCase().includes(searchText) ||
        item.firstName.toLowerCase().includes(searchText)
      );
    });
  }
}
