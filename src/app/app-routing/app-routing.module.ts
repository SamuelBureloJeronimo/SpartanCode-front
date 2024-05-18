import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from '../components/body/product/product.component'
import { createAccountComponent } from '../components/body/createAccout/createAccount.component';
import { RouterModule, Routes } from '@angular/router';
import { loginComponent } from '../components/body/login/login.component';
import { ProductDetailComponent } from '../components/body/product-detail/product-detail.component';
import { RegisterProductComponent } from '../components/body/registerProduct/registerproduct.component';
import { registerAddressComponent } from '../components/body/registerAddress/registerAddress.component';
import { CategoryComponent } from '../components/body/category/category.component';
import { EditCategoryComponent } from '../components/body/edit-category/edit-category.component';
import { BrandComponent } from '../components/body/brand/brand.component';
import { BrandEditComponent } from '../components/body/brand-edit/brand-edit.component';
import { myProfileComponent } from '../components/body/my-profile/my-profile.component';
import { CartComponent } from '../components/body/cart/cart.component';
import { ShoppingComponent } from '../components/body/shopping/shopping.component';
import { SalesComponent } from '../components/body/sales/sales.component';
import { VentasComponent } from '../components/body/ventas/ventas.component';
import { ChoiseAddressComponent } from '../components/body/choise-address/choise-address.component';

const routes: Routes = [
  { path: 'home', component: ProductComponent },
  { path: 'register-user', component: createAccountComponent },
  { path: 'login', component: loginComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'register-product', component: RegisterProductComponent },
  { path: 'register-address', component: registerAddressComponent },
  { path: 'category',component:CategoryComponent},
  { path: 'register-brand', component: BrandComponent },
  { path: 'brand-edit/:id',component:BrandEditComponent},
  { path: 'category-edit/:id',component: EditCategoryComponent },
  { path: 'my-profile',component: myProfileComponent },
  { path: 'carrito',component: CartComponent },
  { path: 'sales',component: SalesComponent },
  { path: 'gestion-ventas',component: VentasComponent },
  { path: 'shopping-transaction',component: ShoppingComponent },
  { path: 'choise-address', component: ChoiseAddressComponent },
  { path: '**', component: ProductComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
