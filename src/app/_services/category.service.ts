import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Category } from '@/_models';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Category[]>(`${config.apiCategoriesUrl}`);
    }
    add(category: Category) {
        // Set authorization headers
        var headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post(`${config.apiCategoriesUrl}`, category, { headers });
    }    
}