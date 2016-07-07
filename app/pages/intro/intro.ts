import {Page, NavController} from 'ionic-angular';
import {CategoriesPage} from '../categories/categories';

@Page({
  templateUrl: 'build/pages/intro/intro.html'
})
export class IntroPage {
  constructor(private nav: NavController){}

  goToHome(){
    this.nav.setRoot(CategoriesPage);
  }
}