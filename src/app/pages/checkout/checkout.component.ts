import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Item } from '../../model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  totalCartPrice = 0;
  activeStep = 1;
  cartItemCount = 0;
  activePaymentButton: string = 'visaCard';
  cartItems: Item[] = [];

  cartService = inject(CartService);
  changeStep() {
    if (this.activeStep < 3) {
      this.activeStep++;
    }
  }

  ngAfterViewChecked() {
    window.scrollTo(0, 0);
  }

  showDetails(button: string): void {
    this.activePaymentButton = button;
  }

  showOptions = false;
  selectedOption!: string;

  selectOption(option: string, event: Event) {
    event.stopPropagation();
    this.selectedOption = option;
    this.showOptions = false;
  }

  ngOnInit() {
    this.cartService.cartItems.subscribe((items) => {
      this.cartItems = items;
      this.cartItemCount = items.length;
      this.calculateTotalPrice();
    });
  }

  removeFromCart(item: Item) {
    this.cartService.removeFromCart(item);
  }

  calculateTotalPrice() {
    this.totalCartPrice = 0;

    for (const item of this.cartItems) {
      const price = parseFloat(item.price);
      this.totalCartPrice += price * (item.count || 0);
    }
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
}
