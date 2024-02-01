import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Item } from '../../model';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RatingComponent } from '../../components/rating/rating.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  totalCartPrice = 0;
  count = 1;

  cartService = inject(CartService);
  router = inject(Router);

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItemCount = items.length;
      this.cartItems = items.map((item) => ({ ...item, count: 1 }));
      console.log(this.cartService.selectedSize);
      this.calculateTotalPrice();
    });
  }

  removeFromCart(item: Item) {
    this.cartService.removeFromCart(item);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      text: `${item.title} removed from cart.`,
      showConfirmButton: false,
      timer: 3000,
    });
  }

  increment(item: Item) {
    if (item.count !== undefined) {
      if (item.count < item.available) {
        item.count++;
        this.calculateTotalPrice();
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'info',
          // title: `You can't add more of ${item.title}. Only ${item.available} available.`,
          text: `You can't add more of ${item.title}. Only ${item.available} available.`,
          showConfirmButton: false,
          timer: 3000,
        });
      }
      this.calculateTotalPrice();
    }
  }

  decrement(item: Item) {
    if (item.count !== undefined && item.count > 1) {
      item.count--;
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    this.totalCartPrice = 0;

    for (const item of this.cartItems) {
      const price = parseFloat(item.price.replace('GH₵', '').trim());
      if (item.count !== undefined) {
        // Now you can safely access item.count
        this.totalCartPrice += price * item.count;
      }
    }
  }

  checkout(event: Event) {
    event.preventDefault();
    this.router.navigate(['/checkout']);
  }
}
