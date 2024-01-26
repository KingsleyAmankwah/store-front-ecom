import { Injectable } from '@angular/core';
import { Item } from '../model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<Item[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(item: Item) {
    const currentCartItems = this.cartItemsSubject.value;
    const itemExists = currentCartItems.some(
      (cartItem) => cartItem.id === item.id
    );

    if (!itemExists) {
      this.cartItemsSubject.next([...currentCartItems, item]);
    } else {
      console.log(`${item.title} is already in the cart.`);
    }
  }

  isItemInCart(item: Item): boolean {
    const currentCartItems = this.cartItemsSubject.value;
    return currentCartItems.some((cartItem) => cartItem.id === item.id);
  }

  getCartItemCount(): number {
    return this.cartItemsSubject.value.length;
  }
}
