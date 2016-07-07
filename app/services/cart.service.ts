import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class CartService {
  private ITEMS: Array<{
    id: number,
    thumbnail: string,
    name: string,
    price: number,
    quantity: number
  }>;

  constructor() {
    this.ITEMS = [];
  }

  add(item: {id: number, thumbnail: string, name: string, price: number, quantity: number}) {
    let index = _.findIndex(this.ITEMS, {'id': item.id});
    if(index !== -1) {
      this.ITEMS[index].quantity = this.ITEMS[index].quantity + item.quantity;
    } else {
      this.ITEMS.push(item);
    }
  }

  remove(item) {
    this.ITEMS.splice(_.findIndex(this.ITEMS, {'id': item.id}), 1);
  }

  update(item) {
    this.ITEMS[_.findIndex(this.ITEMS, {'id': item.id})] = item;
  }

  findAll() {
    return Observable.create(observer => {
      observer.next(this.ITEMS);
      observer.complete();
    });
  }

  findById(id) {
    return Observable.create(observer => {
      observer.next(_.find(this.ITEMS, {'id': id}));
      observer.complete();
    });
  }

  getSubTotal() {
    return Observable.create(observer => {
      observer.next(_.reduce(this.ITEMS, (sum, item) => {
        return sum + (item.quantity * item.price);
      }, 0));
      observer.complete();
    });
  }

}