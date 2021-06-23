import { Injectable } from '@angular/core';
import { Product } from '../product/product.model';

import { Subject } from 'rxjs';
import { Cart } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartChanged = new Subject<Cart[]>();
  carts: Cart[] = [];
  cartTotalLength: number = 0; 
  isLoading = new Subject<boolean>();

  constructor() {
    this.initCart();
    this.cartChanged.subscribe(carts => {
      this.cartTotalLength = this.cartLength(carts);
      localStorage.setItem('cart', JSON.stringify(carts));
      
    });
    this.cartTotalLength = this.cartLength(this.carts);
  }

  initCart(){

    if (localStorage.getItem('cart')) {
      this.carts = JSON.parse(localStorage.getItem('cart') || '{}');

    } else {
      localStorage.setItem('cart', JSON.stringify(this.carts));
    }    
    this.cartChanged.next(this.carts.slice());
  }

  addToCart(product: Product, quantity: number){       
    const exists:any = this.carts.filter(i => i.product.id === product.id);
    
    if(exists.length) {
      exists[0].quantity = exists[0].quantity + quantity;
    } else {      
      const newCart = new Cart(product, quantity);            
      this.carts.push(newCart);
    }

    localStorage.setItem('cart', JSON.stringify(this.carts))
    this.cartChanged.next(this.carts.slice());
    this.isLoading.next(false);
  }

  getCarts() {
    return this.carts.slice()
  }

  getCart(index:number) {
    return this.carts[index];
  }

  updateCart(index:number, new_cart: Cart) {
    this.carts[index] = new_cart;
    this.cartChanged.next(this.carts.slice());   
  }

  deleteCart(index: number) {
    this.carts.splice(index, 1)
    this.cartChanged.next(this.carts.slice());
  }


  cartLength(carts: Cart[]) {
    let toatalLength = 0

    for(let i=0; i<carts.length; i++) {
      toatalLength += carts[i].quantity;
    }
    this.cartTotalLength = toatalLength;
    return toatalLength
  }
}
