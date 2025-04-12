import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,  
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  cartItemCount: number = 0;
  private cartSubscription!: Subscription;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.cart$.subscribe(items => {
      console.log('Cart Items:', items); // ✅ Debugging to check data

      if (items && items.length > 0) {
        this.cartItemCount = items.reduce((sum, item) => sum + (item.stock ?? 1), 0);
      } else {
        this.cartItemCount = 0; // Show "0" initially
      }
    });
  }

  searchProducts() {
    if (!this.searchQuery.trim()) return; // Prevent empty search
    const queryParams = { search: this.searchQuery.trim() };
    
    console.log('🔍 Navigating to search:', queryParams);  // ✅ Debugging
    this.router.navigate(['/search'], { queryParams });
  }
  
  
  // ✅ Remove auto-search on every keystroke
  onSearchInput() {
    console.log('Typing:', this.searchQuery);
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();  // ✅ Prevent memory leaks
    }
  }
}
