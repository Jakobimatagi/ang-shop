import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CheckoutComponent } from './features/checkout/checkout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home-shop',
    pathMatch: 'full',
  },
  {
    path: 'home-shop',
    component: HomeComponent,
  },
  {
    path: 'checkout-shop',
    component: CheckoutComponent,
  },
];
