import { Component } from '@angular/core';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html'    
})
export class CatalogComponent {    
    categoriesSelected: string[] = []; // Share data from child to parent

    receiveCategories($event: any) {
        this.categoriesSelected = $event;
    }
}
