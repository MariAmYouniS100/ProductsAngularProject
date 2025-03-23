import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);

  cart$ = this.cartSubject.asObservable();

  constructor() {}

  addToCart(product: Product) {
    const existingProduct = this.cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.stock! += 1;
    } else {
      this.cart.push({ ...product, stock: 1 });
    }
    this.cartSubject.next([...this.cart]);
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.cartSubject.next([...this.cart]);
  }

  updateQuantity(productId: number, quantity: number) {
    const product = this.cart.find(item => item.id === productId);
    if (product) {
      product.stock = quantity;
      if (product.stock <= 0) {
        this.removeFromCart(productId);
      }
      this.cartSubject.next([...this.cart]);
    }
  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next([]);
  }
}
