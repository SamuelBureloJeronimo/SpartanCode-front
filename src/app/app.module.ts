import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { loginComponent } from './components/body/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { createAccountComponent } from './components/body/createAccout/createAccount.component';
import { RegisterProductComponent } from './components/body/registerProduct/registerproduct.component';
import { registerAddressComponent } from './components/body/registerAddress/registerAddress.component';

import { userService } from './services/user.service';
import { productService } from './services/product.service';
import { postalCodeService } from './services/postalCode.service';

import { ProductComponent } from './components/body/product/product.component';
import { ProductDetailComponent } from './components/body/product-detail/product-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryComponent } from './components/body/category/category.component';
import { ListCategoryComponent } from './components/body/list-category/list-category.component';
import { EditCategoryComponent } from './components/body/edit-category/edit-category.component';
import { BrandComponent } from './components/body/brand/brand.component';
import { BrandEditComponent } from './components/body/brand-edit/brand-edit.component';

import { myProfileComponent } from './components/body/my-profile/my-profile.component';
import { CartComponent } from './components/body/cart/cart.component';
import { ShoppingComponent } from './components/body/shopping/shopping.component';
import { SalesComponent } from './components/body/sales/sales.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    loginComponent,
    createAccountComponent,
    ProductComponent,
    RegisterProductComponent,
    registerAddressComponent,
    CategoryComponent,
    ListCategoryComponent,
    EditCategoryComponent,
    ProductDetailComponent,
    BrandComponent,
    BrandEditComponent,
    myProfileComponent,
    CartComponent,
    ShoppingComponent,
    SalesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [userService, productService, postalCodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
