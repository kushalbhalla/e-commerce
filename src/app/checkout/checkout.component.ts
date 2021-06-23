import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  OnInit
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/common.service';
import { Cart } from '../cart/cart.model';
import { CartService } from '../cart/cart.service';
import { DataService } from '../shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, AfterViewInit, OnDestroy {

  carts: Cart[] = [];
  displayedColumns: string[] = ['product', 'price', 'quantity', 'total'];
  subscription: Subscription = new Subscription;
  cartTotalLength: number = 0; 
  dataSource:any =  [];
  totalPrice:number = 0;
  
  shippingForm!: FormGroup;
  isLoading = false;

  @ViewChild('cardInfo', { static: false }) cardInfo!: ElementRef;

  stripe:any;
  loading = false;
  confirmation:any;

  card: any;
  cardHandler = this.onChange.bind(this);
  error!:string;

  checkObs = new Observable();


  constructor(private router: Router, private dbService:DataService, private http:HttpClient, private cd: ChangeDetectorRef,
    private stripeService:AngularStripeService, private _snackBar: MatSnackBar, private commonService: CommonService, private cartService: CartService) {}

  ngOnInit(): void {
    this.commonService.setTitle('CheckOut');
    this.subscription = this.cartService.cartChanged.subscribe(
      (carts: Cart[]) => {        
        this.carts = carts;     
        this.intiateData(this.carts);
      }
    );

    this.carts = this.cartService.getCarts();
    this.intiateData(this.carts);

    this.shippingForm = new FormGroup({
      'first_name': new FormControl(null, Validators.required),
      'last_name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'zipcode': new FormControl(null, Validators.required),
      'place': new FormControl(null, Validators.required),
    });

  }

  ngAfterViewInit() {
    this.stripeService.setPublishableKey('pk_test_51J13bNSCTmSsZNAdNJ1wgi6lHScmKZNQ0oNkQ9QRn5qvjkHIU7Tjm4WpiTSKtd4TWKj1JHIAr9qF2huR0o526IcL00OgBvNAx4').then(
      stripe=> {
        this.stripe = stripe;
    const elements = stripe.elements();    
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
    });
  }

  async onSubmit() {
    if (this.shippingForm.valid) {
      // this.isLoading = true;
      const { token, error } = await this.stripe.createToken(this.card);

      if (error) {
        this.error = error
      } else {
        this.stripeTokenHandler(token);
      }
      
    }  else {
      this.isLoading = false;
      this._snackBar.open('Please fill all details', 'X', {
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        duration: 2*1000,
      });
    }
  }

  async stripeTokenHandler(token: any) {
    const items = []    
    
    for(let i=0; i< this.carts.length; i++) {
      const product = this.carts[i].product;
      
      const obj = {
        product: product.id,
        quantity: this.carts[i].quantity,
        price: this.carts[i].product.price * this.carts[i].quantity
      }

      items.push(obj)
    }

    const data = {
      'first_name': this.shippingForm.value['first_name'],
      'last_name': this.shippingForm.value['last_name'],
      'email': this.shippingForm.value['email'],
      'address': this.shippingForm.value['address'],
      'zipcode': this.shippingForm.value['zipcode'],
      'place': this.shippingForm.value['place'],
      'phone': this.shippingForm.value['phone'],
      'items': items,
      'stripe_token': token.id
    }    

    this.checkObs = this.dbService.checkoutCarts(data);


    this.checkObs.subscribe(resData => {
      this.carts = [];
      localStorage.setItem('cart', JSON.stringify(this.carts))      
      this.router.navigate(['cart/success']);
    }, 
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
        this._snackBar.open(this.error, 'X', {
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        duration: 2*1000,
      });        
    });

    this.isLoading = false;
    this.shippingForm.reset();
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

    onChange(error:any) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = '';
    }
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.dataSource = [];
    this.subscription.unsubscribe();
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

}
