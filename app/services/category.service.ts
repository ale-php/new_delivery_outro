import {Injectable} from '@angular/core';
import {CATEGORIES} from './categories.mock';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class CategoryService {

    findAll() {
        return Observable.create(observer => {
            observer.next(CATEGORIES);
            observer.complete();
        });
    }

    findById(id) {
        return Observable.create(observer => {
            observer.next(_.find(CATEGORIES, {'id': id}));
            observer.complete();
        });
    }

}