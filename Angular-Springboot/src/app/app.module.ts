import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {StorageServiceModule} from 'angular-webstorage-service';
import {Router, Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { AuthguardGuard } from './Service/authguard.guard';
import { AdminComponent } from './Components/admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './Components/home/product/product.component';
import { CartItemComponent } from './Components/home/cart-item/cart-item.component';
import { AddressComponent } from './Components/home/address/address.component';
import { EditItemComponent } from './Components/admin/edit-item/edit-item.component';
import { OrderItemComponent } from './Components/admin/order-item/order-item.component';
import { ProductQuantityComponent } from './Components/product-quantity/product-quantity.component';
import { OrderSuccessComponent } from './Components/home/order-success/order-success.component';
import { OrderHistoryComponent } from './Components/home/order-history/order-history.component';
import { PaymentDetailsComponent } from './Components/home/payment-details/payment-details.component';
import { FooterComponent } from './Componets/home/footer/footer.component';
const appRoutes:Routes=[
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
{
  path:'login',
  component: LoginComponent
},
{
  path:'register',
  component: RegisterComponent
},
{
  path:'admin',
  component: AdminComponent
}
,
{
  path:'home',
  component: HomeComponent,
  canActivate:[AuthguardGuard]
},
{
  path:'home/cart',
  component: CartItemComponent,
  canActivate:[AuthguardGuard]
},
{
  path:'home/address',
  component: AddressComponent,
  canActivate:[AuthguardGuard]
},
{
  path:'home/payment-details',
  component: PaymentDetailsComponent,
  canActivate:[AuthguardGuard]
},
{
  path:'home/success-order',
  component: OrderSuccessComponent,
  canActivate:[AuthguardGuard]
},
{
  path:'home/order-history',
  component: OrderHistoryComponent,
  canActivate:[AuthguardGuard]
},
{
  path:'admin/edit',
  component: EditItemComponent,
  canActivate:[AuthguardGuard]
},
{
  path:'admin/order',
  component: OrderItemComponent,
  canActivate:[AuthguardGuard]
}
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    HomeComponent,
    CartItemComponent,
    AddressComponent,
    AdminComponent,
    EditItemComponent,
    OrderItemComponent,
    ProductQuantityComponent,
    OrderSuccessComponent,
    OrderHistoryComponent,
    PaymentDetailsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    StorageServiceModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
