import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ShopService } from '../../services/shop-items.service';
import { CommonModule } from '@angular/common';
import { IShopItem } from '../../interfaces/store.interface';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'store-items-list',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
  ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public items: Array<IShopItem> = [];
  public pagedItems: Array<IShopItem> = [];
  public pageSize = 12;
  public pageIndex = 0;
  public isLoading = true;
  constructor(private shopService: ShopService, private cart: CartService) {}

  public ngOnInit() {
    this.isLoading = true;
    this.shopService.getShopItems().subscribe({
      next: (data) => {
        this.items = data;
        this.updatePagedItems();
      },
      error: (err) => {
        console.error('Error loading items', err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  

  public updatePagedItems() {
    const start = this.pageIndex * this.pageSize;
    this.pagedItems = this.items.slice(start, start + this.pageSize);
  }

  public onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedItems();
  }

  public addToCart(item: IShopItem) {
    this.cart.addItem(item);
  }
}