import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productChanged = new Subject<Product[]>();

  private products: Product[] = [];

  constructor() { }

  setProducts(products: Product[]) {    
    this.products = products;   
    this.productChanged.next(this.products.slice());
  }

  getProducts() {    
    return this.products.slice();
  }

  getProduct(index: number) {    
    return this.products[index];
  }

}
