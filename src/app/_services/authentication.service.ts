import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    // The process to login using external auth server
    login(username: string, password: string) {
        // Set authorization headers    
        // var headers = new HttpHeaders().set("Authorization", "Bearer " + token).set("Content-Type", "application/json");    
        var headers = new HttpHeaders().set("Content-Type", "application/json");        
        return this.http.post<any>(`${config.apiAuthUrl}`, { 'email': username, 'password': password }, { headers })
            .pipe(
            map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    const userObj = new User();
                    userObj.id = 0;
                    userObj.username = username;
                    userObj.token = user.token;
                    userObj.firstName = username;
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(userObj));
                    this.currentUserSubject.next(userObj);
                }
                return user;
            }));
    } 

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}