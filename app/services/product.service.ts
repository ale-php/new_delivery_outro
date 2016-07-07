import {Injectable} from '@angular/core';
import {PRODUCTS} from './products.mock';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class ProductService {

    findAll() {
        return Observable.create(observer => {
            observer.next(PRODUCTS);
            observer.complete();
        });
    }

    findById(id) {
        return Observable.create(observer => {
            observer.next(_.find(PRODUCTS, {'id': id}));
            observer.complete();
        });
    }

    findByCategory(categoryId) {
        return Observable.create(observer => {
            observer.next(_.filter(PRODUCTS, {'categoryId': categoryId}));
            observer.complete();
        });
    }

}