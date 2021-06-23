import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from '../product.model';

import { ProductService } from '../product.service';
import { DataService } from 'src/app/shared/data.service';
import { CartService } from 'src/app/cart/cart.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CommonService } from 'src/app/shared/common.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  isProduct = false;
  quantity: number = 1;
  product!: Product;
  category: string = "";
  name: string = "";
  id!: number;
  constructor(private commonService: CommonService, private _snackBar: MatSnackBar, private productService: ProductService, private cartService: CartService, private dbService: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe( 
        (params: Params) => {
          this.category = params.category;
          this.name = params.name;
          this.id = +params['id'];
          
          this.commonService.setTitle(this.category+" "+this.name)
          
          this.dbService.getSeletedProduct(this.category, this.name)
            .subscribe(
              (product: Product) => {                
                this.product = product
                this.isProduct = true;
              }
            );        
        }
      );


  }

  onAddCart(){    
    const user = JSON.parse(localStorage.getItem('userData') || '{}');
        
     if(user._token) {
      this.cartService.isLoading.next(true);
      if (isNaN(this.quantity) || this.quantity < 1) {
      this.quantity = 1
      }   
      this.cartService.addToCart(this.product, Number(this.quantity));
      this.openSnackBar();
      } else {      
        this._snackBar.open('Please login first', 'X', {
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        duration: 2*1000,
      });

      this.router.navigate(['/login'])
    }
    

  }

  openSnackBar() {
    this._snackBar.open('The product was added to the cart', 'X', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 2*1000,
    });
  }

}
