import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { MatCardModule } from '@angular/material/card';
import { IShopItem } from '../../shared/interfaces/store.interface';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'store-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  imports: [MatCardModule, MatIcon, CommonModule, MatButtonModule]
})
export class CheckoutComponent {
  public title = 'Checkout';
  public addedItems: Array<IShopItem> = [];
  constructor(public cart: CartService) {
    effect(() => {
      this.addedItems = this.cart.items()
    });
  }

  public removeFromCart(item: IShopItem) {
    this.cart.removeItem(item.id);
  }
}
