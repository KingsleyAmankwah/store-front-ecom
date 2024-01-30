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
  activeStep = 1;
  activePaymentButton: string = 'visaCard';

  changeStep() {
    if (this.activeStep < 3) {
      this.activeStep++;
    }
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
}
