import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,  
  imports: [RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartItemCount = 0;
  private cartSubscription!: Subscription; // Store the subscription

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.cart$.subscribe(items => {
      console.log('Cart Items:', items); // ✅ Debugging to check data
      if (items) {
        this.cartItemCount = items.reduce((sum, item) => sum + ((item.stock ?? 0)), 0);
      } else {
        this.cartItemCount = 0;
      }
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();  // ✅ Prevent memory leaks
    }
  }
}
