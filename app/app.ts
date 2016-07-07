import {ViewChild} from '@angular/core';
import {App, IonicApp, Platform, Storage, LocalStorage, Nav} from 'ionic-angular';
import {ProfilePage} from './pages/profile/profile';
import {CategoriesPage} from './pages/categories/categories';
import {CartPage} from './pages/cart/cart';
import {IntroPage} from './pages/intro/intro';
import {CategoryService} from './services/category.service';
import {ProductService} from './services/product.service';
import {CartService} from './services/cart.service';

@App({
  templateUrl: 'build/app.html',
  providers: [CategoryService, ProductService, CartService],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{title: string, component: any, icon: string}>;
  local: Storage;

  constructor(private app: IonicApp, private platform: Platform) {
    this.local = new Storage(LocalStorage);
    this.local.get('introShown').then((result) => {
      if(result){
        this.rootPage = CategoriesPage;
      } else {
        this.local.set('introShown', true);
        this.rootPage = IntroPage;
      }
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Menu', component: CategoriesPage, icon: 'home' },
      { title: 'Shopping Cart', component: CartPage, icon: 'cart' },
      { title: 'Profile', component: ProfilePage, icon: 'person' }
    ];

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
