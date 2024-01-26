import { Component, inject } from '@angular/core';
import { Item } from '../../model';
import { RatingComponent } from '../../components/rating/rating.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RatingComponent, CommonModule, FooterComponent, NavbarComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  router = inject(Router);
  cartService = inject(CartService);

  goToDetails(item: Item) {
    this.router.navigate(['/details', item.id]);
  }

  addToCart(item: Item) {
    if (item) {
      const itemExistsInCart = this.cartService.isItemInCart(item);

      if (!itemExistsInCart) {
        this.cartService.addToCart(item);
        console.log(`Added ${item.title} to cart.`);
      } else {
        console.log(`${item.title} is already in the cart.`);
      }
    }
  }

  items: Item[] = [
    new Item(
      1,
      './assets/1.png',
      'Stylish Leather Jacket',
      'GH₵ 1,999.00',
      4,
      10
    ),
    new Item(
      2,
      './assets/2.png',
      'Vintage Blue Leather Jacket',
      'GH₵ 2,299.00',
      4.2,
      8
    ),
    new Item(
      3,
      './assets/3.png',
      'Classic Blue-black Denim Jacket',
      'GH₵ 1,799.00',
      3,
      15
    ),
    new Item(4, './assets/4.png', 'Sleek Bomber Jacket', 'GH₵ 2,499.00', 4, 12),
    new Item(
      5,
      './assets/5.png',
      'Elegant Velvet Jacket',
      'GH₵ 2,799.00',
      4,
      7
    ),
    new Item(
      6,
      './assets/6.png',
      'Fashionable Gray Parka',
      'GH₵ 2,199.00',
      4,
      9
    ),
    new Item(
      7,
      './assets/7.png',
      'Chic Black Leather Jacket',
      'GH₵ 2,599.00',
      4.6,
      11
    ),
    new Item(
      8,
      './assets/8.png',
      'Trendy Brown Raincoat',
      'GH₵ 1,899.00',
      4,
      14
    ),
    new Item(
      9,
      './assets/9.png',
      'Modern Pink Puffer Jacket',
      'GH₵ 2,399.00',
      4.4,
      13
    ),
    new Item(
      10,
      './assets/10.png',
      'Casual Black Utility Jacket',
      'GH₵ 1,699.00',
      3,
      18
    ),
    new Item(
      11,
      './assets/11.png',
      'Sporty Green Windbreaker',
      'GH₵ 2,899.00',
      4.9,
      6
    ),
    new Item(
      12,
      './assets/12.png',
      'Funky Brown Faux Fur Jacket',
      'GH₵ 2,199.00',
      4.6,
      10
    ),
  ];
}
