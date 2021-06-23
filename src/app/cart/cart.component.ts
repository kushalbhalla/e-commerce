import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from '../shared/common.service';
import { Cart } from './cart.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  carts: Cart[] = [];
  displayedColumns: string[] = ['product', 'price', 'quantity', 'total', 'cancel'];
  subscription: Subscription = new Subscription;
  cartTotalLength: number = 0; 
  dataSource:any =  [];
  totalPrice:number = 0;

  constructor(private commonService: CommonService, private cartService: CartService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.commonService.setTitle('Cart')
    this.subscription = this.cartService.cartChanged.subscribe(
      (carts: Cart[]) => {        
        this.carts = carts;     
        this.intiateData(this.carts);
      }
    );

    this.carts = this.cartService.getCarts();
    this.intiateData(this.carts);
  }

  minusQuantity(id:number) {
    this.carts.forEach( (value) => {
      if (value.product.id === id) {
        value.quantity-= 1;
        this.cartService.updateCart(this.carts.indexOf(value), value);
      }
    });    
  }

  addQuantity(id:number) {  
    this.carts.forEach( (value) => {
      if (value.product.id === id) {
        value.quantity+= 1;
        this.cartService.updateCart(this.carts.indexOf(value), value);
      }
    });
    
  }

  onDelete(id: number) {
    this.carts.forEach( (value) => {
      if (value.product.id === id) {
        value.quantity-= 1;
        this.cartService.deleteCart(this.carts.indexOf(value));
      }
    })
  }

  private intiateData(carts: Cart[]) {
    this.totalPrice = 0;
    this.cartTotalLength = this.cartService.cartTotalLength;
    this.dataSource = [];
    this.carts.forEach( (value) => {            
      this.dataSource.push( {
        'id':value.product.id,
        'product':value.product.name,
        'price': value.product.price,
        'quantity': value.quantity,
        'total': value.product.price * value.quantity
      });            
    });    
    this.dataSource.forEach( (value: { total: number; }) => {
      this.totalPrice+=value.total;
    });
    
  }

  onCheckout() {    
    this.router.navigate(['checkout'], { relativeTo: this.route});
  }

  ngOnDestroy() {
    this.dataSource = [];
    this.subscription.unsubscribe();
  }
}
