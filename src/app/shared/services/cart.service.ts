import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ICartItem, IShopItem } from './../interfaces/store.interface';
import { computed, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly isBrowser: boolean;

  private readonly _items = signal<Array<ICartItem>>([]);

  readonly items = computed(() => this._items());

  readonly totalCount = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly totalPrice = computed(() =>
    this._items().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const stored = localStorage.getItem('cart');
      if (stored) {
        this._items.set(JSON.parse(stored));
      }

      effect(() => {
        localStorage.setItem('cart', JSON.stringify(this._items()));
      });
    }
  }

  public addItem(product: IShopItem): void {
    const current = this._items();
    const index = current.findIndex(i => i.id === product.id);

    if (index > -1) {
      const updated = [...current];
      updated[index] = {
        ...updated[index],
        quantity: updated[index].quantity + 1
      };
      this._items.set(updated);
    } else {
      this._items.set([...current, { ...product, quantity: 1 }]);
    }
  }

  public removeItem(productId: number): void {
    this._items.set(this._items().filter(item => item.id !== productId));
  }

  public updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    const updated = this._items().map(item =>
      item.id === productId ? { ...item, quantity } : item
    );

    this._items.set(updated);
  }

  public clearCart(): void {
    this._items.set([]);
  }
}
