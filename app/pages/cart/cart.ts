import {Page, NavController, NavParams} from 'ionic-angular';
import {CartService} from '../../services/cart.service';
import {CategoriesPage} from '../categories/categories';

@Page({
  templateUrl: 'build/pages/cart/cart.html'
})
export class CartPage {
  cartItems: Array<{
    id: number,
    thumbnail: string,
    name: string,
    price: number,
    quantity: number
  }>;
  navParams: any;
  cartService: any;
  subTotal: number;
  shipping: number;
  total: number;

  constructor(private nav: NavController, navParams: NavParams, cartService: CartService) {
    this.navParams = navParams;
    this.cartService = cartService;

    this.shipping = 8;
  }

  ngOnInit() {
    this.cartService.findAll().subscribe(
      data => this.cartItems = data
    )

    this.cartService.getSubTotal().subscribe(
      data => {
        this.subTotal = data;
        this.total = this.shipping + this.subTotal;
      }
    )
  }

  updateQuantity(item){
    this.cartService.update(item);
  }

  remove(item) {
    this.cartService.remove(item);
  }

  checkout(){}

  goToProducts() {
    this.nav.setRoot(CategoriesPage);
  }
}
