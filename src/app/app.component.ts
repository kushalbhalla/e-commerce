import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './shared/data.service';
import { AuthService } from './shared/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'shopKart';
  loggedIn = false;
  userSub = new Subscription;

  public onToggleSidenav = () => {}
  inputText: string ='';
  constructor(private authService:AuthService, private dbService: DataService, private router: Router) {
    this.authService.autoLogin();
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      user => {
        this.loggedIn = !!user;        
      }
    );    
  }

  onSearched() {    
    this.dbService.getSearchedProduct(this.inputText);    
    this.router.navigate(["search"], {queryParams: {query: this.inputText}});    
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
