import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
//import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
// Filters
import { ProductFilterPipe } from './_filters';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
//import { RegisterComponent } from './register';
import { SignupComponent } from './signup';

import { CatalogComponent } from './catalog';
import { CategoriesComponent } from './categories';
import { ProductsComponent } from './products';
import { CategoryAddComponent } from './category-add';
import { ProductAddComponent } from './product-add'; 

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        //RegisterComponent,
        SignupComponent,
        CatalogComponent,
        CategoriesComponent,
        ProductsComponent,
        ProductFilterPipe,
        CategoryAddComponent,
        ProductAddComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

        // provider used to create fake backend
        //fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }