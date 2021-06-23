import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap, catchError } from 'rxjs/operators';

import { ProductService } from '../product/product.service';
import { Product } from '../product/product.model';
import { SearchService } from '../product/search/search.service';
const Url = 'http://127.0.0.1:8000/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private searchService: SearchService, private productService: ProductService, private http: HttpClient) { }

  getLatestProucts() {        
    return this.http.
      get<Product[]>(
        Url+'latest-products/'
      )
      .pipe(
        map(products => {          
          return products.map(product => {
            return {
            ...product
            };
          });
        }), 
        tap(products => {          
          this.productService.setProducts(products);
        })
      );
  }

  getSeletedProduct(category: string, name: string) {
    return this.http
      .get<Product>(
        Url+"products/"+category+"/"+name+"/"
      );
  }

  getCategoryProducts(category: string) {
    return this.http.
      get(
        Url+"products/"+category+"/"
      );
  }

  getSearchedProduct(searchedInput: string) {        
    // http://127.0.0.1:8000/api/v1/products/search/?query=jacket
    return this.http.
      post(
        Url+"products/"+"search/"+"?query="+searchedInput, {
          params: new HttpParams().set('query', searchedInput)
        }
      ).subscribe(
        resData => {    
                        
          this.searchService.setParams(resData);
        }
      );
  }

  checkoutCarts(data: any) {
    return this.http.
      post(
        Url+"checkout/", data
      )
  }

  getMyOrders() {
    return this.http.
      get(
        Url+"orders/"
      );
  }


}
