/**
 * https://codeburst.io/create-a-search-pipe-to-dynamically-filter-results-with-angular-4-21fd3a5bec5c
 **/
import { Pipe, PipeTransform } from '@angular/core';
// The ORM
import { Product } from '@/_models';

@Pipe({
    name: 'product_filter'
})

export class ProductFilterPipe implements PipeTransform {

    transform(items: Product[], categories: string[]): Product[] {
        
        if (!items) return [];
        // Must be an array to use .some() function
        var selected: string[] = categories['categories'] ? categories['categories'] : [];

        //if (selected.length == 0) return items;
        
        // Filter over categories selected
        return items.filter(product => {
            return selected.some((catId) => {                
                return product.category.includes(catId.trim());
            });
        });
        /*
        // === With a single string this should work ===
        return items.filter(it => {      
          return it.category.includes(categories);
        });
        */
    }
}
