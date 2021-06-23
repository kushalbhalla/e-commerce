import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductItemComponent } from './product/product-item/product-item.component';
import { CategoryComponent } from './product/category/category.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProductService } from './product/product.service';
import {MatCardModule} from '@angular/material/card';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthInterceptorService } from './shared/auth-interceptor.service';
import { MyAccountComponent } from './my-account/my-account.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccessComponent } from './success/success.component';
import { NgxStripeModule } from 'ngx-stripe';
import { SearchComponent } from './product/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    ProductItemComponent,
    CategoryComponent,
    CartComponent,
    LoginComponent,
    SignupComponent,
    ProductDetailComponent,
    MyAccountComponent,
    CheckoutComponent,
    SuccessComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_test_51J13bNSCTmSsZNAdNJ1wgi6lHScmKZNQ0oNkQ9QRn5qvjkHIU7Tjm4WpiTSKtd4TWKj1JHIAr9qF2huR0o526IcL00OgBvNAx4'),
    MatToolbarModule,
    MatIconModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    AppRoutingModule,
    MatCardModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  // providers: [ProductService],
  providers: [ProductService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
