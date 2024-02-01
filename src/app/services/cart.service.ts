import { Injectable } from '@angular/core';
import { Item } from '../model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<Item[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private _selectedSize: string | null = null;

  public get selectedSize(): string | null {
    return this._selectedSize;
  }

  public set selectedSize(value: string | null) {
    this._selectedSize = value;
  }

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

  removeFromCart(item: Item) {
    const currentItems = this.cartItemsSubject.value;
    const newItems = currentItems.filter((i) => i.id !== item.id);
    this.cartItemsSubject.next(newItems);
  }

  isItemInCart(item: Item): boolean {
    const currentCartItems = this.cartItemsSubject.value;
    return currentCartItems.some((cartItem) => cartItem.id === item.id);
  }

  getCartItemCount(): number {
    return this.cartItemsSubject.value.length;
  }
}
