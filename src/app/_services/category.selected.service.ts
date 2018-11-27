import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategorySelectedService {

    private subject = new Subject<any>();    

    sendCategories(categories: string[]) {
        this.subject.next({ categories: categories });
    }
    getCategories(): Observable<any> {
        return this.subject.asObservable();
    }
}
