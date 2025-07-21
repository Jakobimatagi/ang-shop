import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ShopService } from '../../services/shop-items.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { IShopItem } from '../../interfaces/store.interface';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { map } from 'rxjs';
@Component({
  selector: 'store-top-items',
  standalone: true,
  imports: [CurrencyPipe, MatIconModule, CommonModule, MatButtonModule],
  templateUrl: './top-items.component.html',
  styleUrl: './top-items.component.scss'
})
export class TopItemsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public topItems: Array<IShopItem> = [];
  public isLoading = true;
  constructor(private shopService: ShopService, private cart: CartService) {}

  public ngOnInit() {
    this.shopService.getShopItems().pipe(
      //return the top 10 rated items
      map(items => [...items].sort((a,b) => b.rating?.rate - a.rating?.rate).slice(0,10))
    ).subscribe(data => {
      this.topItems = data;
      this.isLoading = false;
    });
  }

  public addToCart(item: IShopItem) {
    this.cart.addItem(item);
  }
}