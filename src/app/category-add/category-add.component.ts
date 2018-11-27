import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Category } from '@/_models';

import { AlertService, CategoryService } from '@/_services';

@Component({ templateUrl: 'category-add.component.html' })
export class CategoryAddComponent implements OnInit{

    categoryForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,        
        private alertService: AlertService,
        private categoryService: CategoryService
    ) {}

    ngOnInit() {
        this.categoryForm = this.formBuilder.group({
            categoryname: ['', Validators.required]            
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.categoryForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.categoryForm.invalid) {
            return;
        }
        // Set new instance to send category as an object
        const category: Category = new Category();
        category.name = this.f.categoryname.value;
        // Call service in charge of creating the record
        this.loading = true;
        this.categoryService.add(category).pipe(first()).subscribe(
            data => {                
                this.router.navigate([this.returnUrl]);
            }, error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
        /*
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
            */
    }
}