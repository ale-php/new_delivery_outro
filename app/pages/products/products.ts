import {Page, NavController, Modal, NavParams} from 'ionic-angular';
import {CategoryService} from '../../services/category.service';
import {ProductService} from '../../services/product.service';
import {ProductPage} from '../product/product';

@Page({
  templateUrl: 'build/pages/products/products.html'
})
export class ProductsPage {
  category: {
    id: number,
    cover: string,
    name: string,
    description: string
  };
  products: Array<{
    id: number,
    categoryId: number,
    thumbnail: string,
    cover: string,
    name: string,
    description: string,
    price: number,
    likes: number
  }>;
  navParams: any;
  productService: any;
  categoryService: any;

  constructor(private nav: NavController, navParams: NavParams, productService: ProductService, categoryService: CategoryService) {
    this.navParams = navParams;
    this.productService = productService;
    this.categoryService = categoryService;
  }

  ngOnInit() {
    let categoryId = this.navParams.get('categoryId');

    this.categoryService.findById(categoryId).subscribe(
      data => this.category = data
    )

    this.productService.findByCategory(categoryId).subscribe(
      data => this.products = data
    );
  }

  itemTapped(event, productId) {
    let modal = Modal.create(ProductPage, {
      productId: productId
    });
    this.nav.present(modal);
  }
}
