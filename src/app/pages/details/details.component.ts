import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../model';
import { ShopComponent } from '../shop/shop.component';
import { RatingComponent } from '../../components/rating/rating.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RatingComponent, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  item!: Item | undefined;

  route = inject(ActivatedRoute);
  cartService = inject(CartService);
  router = inject(Router);
  shopComponent = inject(ShopComponent);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.item = this.getItemById(id);
    console.log(this.item);
  }

  getItemById(id: number): Item | undefined {
    return this.shopComponent.items.find((item) => item.id === id);
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
        this.cartService.addToCart(this.item);
        console.log(`Added ${this.item.title} to cart.`);
      } else {
        console.log(`${this.item.title} is already in the cart.`);
        // Optionally, you can provide feedback to the user here.
      }
    }
  }
}
