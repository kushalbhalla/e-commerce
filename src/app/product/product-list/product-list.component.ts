import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  latestProduct: Product[] = [];
  subscription: Subscription = new Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.subscription = this.productService.productChanged.subscribe(
      (products: Product[]) => {
        this.latestProduct = products
      }
    )
    this.latestProduct = this.productService.getProducts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
