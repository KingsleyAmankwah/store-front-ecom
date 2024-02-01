import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Item } from '../../model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  totalCartPrice = 0;
  count = 1;
  activeStep = 1;
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
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
  }

  removeFromCart(item: Item) {
    this.cartService.removeFromCart(item);
  }

  calculateTotalPrice() {
    // Reset totalCartPrice before recalculating
    this.totalCartPrice = 0;

    // Sum up the prices of all items in the cart
    for (const item of this.cartItems) {
      // Parse the price as a float (assuming it's a string in the format 'GH₵ xxx.xx')
      const price = parseFloat(item.price.replace('GH₵', '').trim());
      this.totalCartPrice += price * this.count;
    }
  }
}
