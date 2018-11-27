import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }    

    register(user: any) {        
        var headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post(`${config.apiUsersUrl}/signup`, user, { headers });
    }

    
}