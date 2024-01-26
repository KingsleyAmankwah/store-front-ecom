import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { DetailsComponent } from './pages/details/details.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'shop',
    component: ShopComponent,
  },

  { path: 'details/:id', component: DetailsComponent },

  {
    path: 'cart',
    component: CartComponent,
  },

  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
