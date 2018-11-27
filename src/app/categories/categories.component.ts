import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User, Category } from '@/_models';
import { CategoryService, AuthenticationService, CategorySelectedService } from '@/_services';

@Component({    
    selector: 'app-categories',
    templateUrl: 'categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    categories: Category[] = [];
    isLoading: boolean = true;

    private categoriesSelected: string[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private categoryService: CategoryService,
        private categorySelectedService: CategorySelectedService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAllCategories();        
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }    

    private loadAllCategories() {
        this.categoryService.getAll().pipe(first()).subscribe(categories => {            
            this.categories = categories['categories'];
            this.isLoading = false;

            // Set first category selected by default
            this.selectCategory((categories['categories'] !== 'undefined' ? categories['categories'][0] : []));
        });        
    }
    // Keep track of what categories are selected
    selectCategory(category: Category) {
        // Add/Remove from selected array ???
        if (category.selected) {
            for (var i = 0; i < this.categoriesSelected.length; i++) {
                if (this.categoriesSelected[i] === category._id) {
                    this.categoriesSelected.splice(i, 1);
                }
            }
        } else {
            this.categoriesSelected.push(category._id);
        }
        // CSS class On or Off <li> item
        category.selected = !category.selected;

        // Notify all the subscribers
        this.categorySelectedService.sendCategories(this.categoriesSelected);
    }
}