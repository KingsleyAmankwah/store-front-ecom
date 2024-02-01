import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  cartItemCount = 0;
  showLogout = false;

  cartService = inject(CartService);
  router = inject(Router);
  authService = inject(AuthService);

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItemCount = items.length;
    });
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  login() {
    this.authService.setLoggedIn(true);
  }

  signup() {
    this.authService.setLoggedIn(true);
  }

  toggleLogout() {
    this.showLogout = !this.showLogout;
  }

  logout() {
    this.authService.logout();
    this.showLogout = false;
  }
}
