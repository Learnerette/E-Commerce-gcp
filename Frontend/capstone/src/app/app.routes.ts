import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './admin/auth/components/signup/signup.component';
import { LoginComponent } from './admin/auth/components/login/login.component';
import { ProductManagerComponent } from './admin/product-manager/components/product-manager/products.component';
import { AddProductsComponent } from './admin/product-manager/components/add-product/add-product.component';
import { EditProductComponent } from './admin/product-manager/components/edit-product/edit-product.component';
import { AboutComponent } from './about/about.component';
import { ProductDetailsComponent } from './users/components/product-details/product-details.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { OrderDetailsComponent } from './users/components/order-details/order-details.component';
import { AddressComponent } from './users/components/address/address.component';
import { AuthGuard } from './admin/auth/guards/auth.guard';
import { ListProductsComponent } from './admin/product-manager/components/list-products/list-products.component';
import { CartComponent } from './users/components/cart/components/cart/cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'about', component: AboutComponent, title: 'About' },
  { path: 'cart', component: CartComponent,title:'Cart'},
  { path: 'order-details/:id', component: OrderDetailsComponent,title:'Order-Details' },
  { path: 'product-view/:id', component: ProductDetailsComponent, title: 'View Product' },
  { path: 'admin/auth/login', component: LoginComponent, title: 'Login' },
  { path: 'admin/auth/signup', component: SignupComponent, title: 'SignUp' },
  { path: 'not-found', component: NotFoundComponent, title: 'Not Found' }, 
  { path: 'address', component: AddressComponent ,title:'Address'},
  {
    path: 'admin/products',
    component: ProductManagerComponent,
    title: 'Product Management',
    canActivate: [AuthGuard],
    children: [
      { path: 'add', component: AddProductsComponent, title: 'Add Product' },
      { path: 'list', component: ListProductsComponent, title: 'List Products' },
      { path: 'edit/:id', component: EditProductComponent, title: 'Edit Product' }
    ]
  },
  { path: '**', redirectTo: 'not-found' }];
