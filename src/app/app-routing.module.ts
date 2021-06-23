import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { MyAccountComponent } from "./my-account/my-account.component";

import { CategoryComponent } from "./product/category/category.component";
import { ProductDetailComponent } from "./product/product-detail/product-detail.component";
import { AuthGuard } from "./shared/auth.guard";
import { SignupComponent } from "./signup/signup.component";
import { SearchComponent } from "./product/search/search.component";
import { SuccessComponent } from "./success/success.component";

const routes: Routes = [
    { path: '', component:HomeComponent },
    { 
        path: 'cart', 
        component: CartComponent, 
        canActivate: [AuthGuard]
    },
    { path: 'cart/checkout', component: CheckoutComponent },
    { path: 'cart/success', component: SuccessComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'search', component: SearchComponent},
    { path: 'my-account', component: MyAccountComponent, canActivate: [AuthGuard]},
    { path: ':category/:id/:name', component: ProductDetailComponent },
    { path: ':category', component: CategoryComponent},
    { path: '**', redirectTo: '' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}