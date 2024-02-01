import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLoggedInSubject.asObservable();

  constructor() {
    // Retrieve the login state from sessionStorage on service initialization
    const savedLoginState = sessionStorage.getItem('isLoggedIn');
    if (savedLoginState) {
      this.isLoggedInSubject.next(JSON.parse(savedLoginState));
    }
  }

  setLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
    sessionStorage.setItem('isLoggedIn', JSON.stringify(value));
  }

  logout() {
    this.setLoggedIn(false);
  }
}
