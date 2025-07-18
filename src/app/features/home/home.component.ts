import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemListComponent } from "../../shared/components/item-list/item-list.component";
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'shop-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [ItemListComponent]
})
export class HomeComponent {
  public title = 'Home';
}
