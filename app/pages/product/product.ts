import {Page, NavController, NavParams, ViewController} from 'ionic-angular';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import {CartPage} from '../cart/cart';

@Page({
  templateUrl: 'build/pages/product/product.html'
})
export class ProductPage {
  product: {
    id: number,
    categoryId: number,
    thumbnail: string,
    cover: string,
    name: string,
    description: string,
    price: number,
    likes: number
  };
  productService: any;
  cartService: any;
  navParams: any;
  viewCtrl: any;
  form: any;
  newItem: {
    quantity: number
  };

  constructor(private nav: NavController, navParams: NavParams, productService: ProductService, cartService: CartService, viewCtrl: ViewController) {
    this.productService = productService;
    this.cartService = cartService;
    this.navParams = navParams;
    this.viewCtrl = viewCtrl;

    this.newItem = {
      quantity: 1
    };
  }

  ngOnInit() {
    this.productService.findById(this.navParams.get('productId')).subscribe(
      data => this.product = data
    );
  }

  close() {
    this.viewCtrl.dismiss();
  }

  addToCart(item) {
    this.cartService.add({
      id: item.id,
      name: item.name,
      thumbnail: item.thumbnail,
      price: item.price,
      quantity: +this.newItem.quantity
    })
    this.newItem = {
      quantity: 1
    };
    this.nav.push(CartPage);
  }
}