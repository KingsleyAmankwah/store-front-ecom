import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  cartItemCount = 0;

  cartService = inject(CartService);

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItemCount = items.length;
    });
  }
}
