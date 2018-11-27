import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product } from '@/_models';

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Product[]>(`${config.apiProductsUrl}`);
    }
    add(product: FormData) {
        // Set authorization headers
        var headers = new HttpHeaders().set("Accept", "application/json");
        return this.http.post(`${config.apiProductsUrl}`, product, { headers });
    }
}