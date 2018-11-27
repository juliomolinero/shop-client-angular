import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Category, Product } from '@/_models';

import { AlertService, CategoryService, ProductService } from '@/_services';

@Component({ templateUrl: 'product-add.component.html' })
export class ProductAddComponent implements OnInit {

    categories: Category[] = [];
    productForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private categoryService: CategoryService,
        private productService: ProductService
    ) { }

    // convenience getter for easy access to form fields
    get f() { return this.productForm.controls; }

    ngOnInit() {
        this.productForm = this.formBuilder.group({
            productName: ['', Validators.required],
            productPrice: ['', [Validators.required, Validators.pattern(/^[.\d]+$/)] ],
            productCategory: ['', Validators.required]            
        });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.loadAllCategories();
    }

    fileData: any = null;
    fileEvent(e: any) {
        let reader = new FileReader();
        if (e.target.files && e.target.files.length > 0) {
            this.fileData = e.target.files[0];            
        }
    }
    loadAllCategories(): void {
        this.categoryService.getAll().pipe(first()).subscribe(categories => {
            this.categories = categories['categories'];
        });        
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.productForm.invalid) {
            return;
        }
        // Prepare what is passing to NodeJS
        let formData: FormData = new FormData();
        formData.append('name', this.f.productName.value);
        formData.append('price', this.f.productPrice.value);
        formData.append('category', this.f.productCategory.value);
        formData.append('productImageUrl', this.fileData);

        // Call service in charge of creating the record
        this.loading = true;
        this.productService.add( formData ).pipe(first()).subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            }, error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );        
    }
}