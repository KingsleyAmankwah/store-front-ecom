import { Injectable } from '@angular/core';
import { Item } from '../model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<Item[]>([]);
  cartItems = this.cartItemsSubject.asObservable();

  private _selectedSize!: string;

  public get selectedSize() {
    return this._selectedSize;
  }

  public set selectedSize(value: string) {
    this._selectedSize = value;
  }

  addToCart(item: Item, quantity: number = 1) {
    const currentCartItems = this.cartItemsSubject.value || [];
    const existingItemIndex = currentCartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      currentCartItems[existingItemIndex].count! += quantity;
    } else {
      // Item does not exist, add it to the cart with the quantity
      const newItem = { ...item, count: quantity };
      currentCartItems.push(newItem);
    }
    // Emit the updated cartItems array
    this.cartItemsSubject.next([...currentCartItems]);
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
