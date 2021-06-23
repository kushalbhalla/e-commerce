import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { CommonService } from '../shared/common.service';
import { DataService } from '../shared/data.service';
import { MyAccountService } from './my-account.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  subscription!: Subscription;
  myOrders:any = [];
  isLoading = new Subject<boolean>();
  dataSource:any =  [];
  displayedColumns: string[] = ['product', 'price', 'quantity', 'total'];
  ordersList:any = [];
  constructor(private authService: AuthService, private commonService:CommonService, private myaccountService: MyAccountService, private router: Router, private dbService: DataService) {}

  ngOnInit(): void {
    this.commonService.setTitle('Cart');
    this.subscription = this.myaccountService.myOrdersChanged.subscribe(
      myOrders => {
        this.myOrders = myOrders
        this.intiateData(this.myOrders);
      }
    );
    this.myOrders = this.myaccountService.getOrders();
  }

  private intiateData(orders:any) {    
    for (let i=0; i<orders.length; i++) {
      this.dataSource = [];
      orders[i]['items'].forEach( (value:any) => {            
      this.dataSource.push( {
        'product':value.product.name,
        'price': value.product.price,
        'quantity': value.quantity,
        'total': value.price
      });            
    });  
    this.ordersList.push(
      this.dataSource
    );
    }    
  }

  onLogout() {
    localStorage.removeItem('userData');
    this.authService.user.next(null);
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}