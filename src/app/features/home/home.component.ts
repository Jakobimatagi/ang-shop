import { Component, effect } from '@angular/core';
import { ItemListComponent } from "../../shared/components/item-list/item-list.component";
import { TopItemsComponent } from "../../shared/components/top-items/top-items.component";

@Component({
  selector: 'shop-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [ItemListComponent, TopItemsComponent]
})
export class HomeComponent {
  public title = 'Home';
}
