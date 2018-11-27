import { Routes, RouterModule } from '@angular/router';
// Components
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { SignupComponent } from './signup';
//import { RegisterComponent } from './register';

import { CatalogComponent } from './catalog';
import { CategoryAddComponent } from './category-add';
import { ProductAddComponent } from './product-add';

// Check what URL's need authenticated users
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    //{ path: '', component: HomeComponent },
    { path: '', component: CatalogComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: SignupComponent },

    { path: 'catalog', component: CatalogComponent },
    { path: 'product-add', component: ProductAddComponent, canActivate: [AuthGuard] },
    { path: 'category-add', component: CategoryAddComponent, canActivate: [AuthGuard] },


    // otherwise redirect to catalog
    { path: '**', redirectTo: 'catalog' }
];

export const routing = RouterModule.forRoot(appRoutes);