import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../model';
import { ShopComponent } from '../shop/shop.component';
import { RatingComponent } from '../../components/rating/rating.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RatingComponent, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  item!: Item;
  selectedSize: string | string = '';

  route = inject(ActivatedRoute);
  cartService = inject(CartService);
  router = inject(Router);
  shopComponent = inject(ShopComponent);

  ngAfterViewChecked() {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.item = this.getItemById(id)!;
  }
  selectSize(size: string) {
    this.selectedSize = size;
    this.cartService.selectedSize = size;
  }

  getItemById(id: number): Item | undefined {
    return this.shopComponent.items.find((item) => item.id === id);
  }

  count = 1;

  increment() {
    if (this.count < this.item.available) {
      this.count++;
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'info',
        text: `You can't add more of ${this.item.title}. Only ${this.item.available} available.`,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }

  decrement() {
    if (this.count > 1) {
      this.count--;
    }
  }

  buyNow() {
    if (this.item) {
      this.cartService.addToCart(this.item);
      this.router.navigate(['/cart']);
    }
  }

  addToCart() {
    if (this.item) {
      const itemExistsInCart = this.cartService.isItemInCart(this.item);

      if (!itemExistsInCart) {
        // Make sure a size is selected before adding to cart
        if (this.selectedSize) {
          // Add the selected size to the item
          this.item.selectedSize = this.selectedSize;
          this.cartService.addToCart(this.item);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            text: `${this.item.title} added to cart.`,
            showConfirmButton: false,
            timer: 4000,
          });
        } else {
          // Show a message if no size is selected
          Swal.fire({
            position: 'top-end',
            icon: 'info',
            text: 'Please select a size before adding to cart.',
            showConfirmButton: false,
            timer: 4000,
          });
        }
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'info',
          text: `${this.item.title} is already in the cart.`,
          showConfirmButton: false,
          timer: 4000,
        });
      }
    }
  }
}
