// shop.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IShopItem } from '../interfaces/store.interface';


@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getShopItems(): Observable<Array<IShopItem>> {
    return this.http.get<Array<IShopItem>>(this.apiUrl);
  }
}
