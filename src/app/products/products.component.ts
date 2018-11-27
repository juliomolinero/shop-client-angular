import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

// The service
import { ProductService, CategorySelectedService } from '@/_services';
import { Product } from '@/_models';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    // Same property as in categories component    
    products: Product[];
    isLoading: boolean = true;
    apiProductsUrl: string = "";
    // Subscriptions
    categories: any;
    private currentCategorySubscription: Subscription;

    constructor(
        private productService: ProductService,
        private categorySelectedService: CategorySelectedService
    ) {
        this.currentCategorySubscription = this.categorySelectedService.getCategories().subscribe(categories => {
            this.categories = categories;
        });
    } 

    ngOnInit() {
        this.loadAllProducts();
        this.apiProductsUrl = config.apiProductsUrl.replace('/products',''); // remove /products from link
    }
    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentCategorySubscription.unsubscribe();
    }    

    private loadAllProducts() {
        this.productService.getAll().pipe(first()).subscribe(products => {
            this.products = products['products'];
            this.isLoading = false;
        });
    }

}
