import {Page, NavController, NavParams} from 'ionic-angular';
import {CategoryService} from '../../services/category.service';
import {ProductsPage} from '../products/products';

@Page({
  templateUrl: 'build/pages/categories/categories.html'
})
export class CategoriesPage {
  categories: Array<{
    id: number,
    cover: string,
    name: string,
    description: string
  }>;
  categoryService: any;

  constructor(private nav: NavController, navParams: NavParams, categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  ngOnInit() {
    this.categoryService.findAll().subscribe(
      data => this.categories = data
    );
  }

  itemTapped(event, categoryId) {
    this.nav.push(ProductsPage, {
      categoryId: categoryId
    });
  }
}
