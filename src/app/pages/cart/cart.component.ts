import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Item } from '../../model';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RatingComponent } from '../../components/rating/rating.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RatingComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems: Item[] = [];
  cartItemCount = 0;

  cartService = inject(CartService);

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.cartItemCount = items.length;
    });
  }

  count = 1;

  increment() {
    this.count++;
  }

  decrement() {
    if (this.count > 1) {
      this.count--;
    }
  }
}
