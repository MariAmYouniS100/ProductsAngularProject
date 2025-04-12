import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-search',
  standalone: true, 
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [CommonModule, RouterModule]
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  filteredProducts: Product[] = [];
  allProducts: Product[] = [];
  hoverState: { [key: number]: boolean } = {}; 

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = (params['search'] || '').trim().toLowerCase();
      console.log('🔎 Captured Search Query:', `"${this.searchQuery}"`);
  
      if (this.searchQuery) {
        this.getSearchResults();
      } else {
        console.warn('⚠️ No search query provided!');
      }
    });
  }
  

  getSearchResults() {
    this.productService.getProducts().subscribe(response => {
      console.log('API Response:', response); // ✅ Debugging

      if (Array.isArray(response.products) && response.products.length > 0) {
        this.allProducts = response.products;
        console.log('All Products:', this.allProducts); // ✅ Debugging
        this.filterProducts();
      } else {
        console.error('Error: No products found in response', response);
        this.filteredProducts = [];
      }
    });
  }

  filterProducts() {
    console.log('🔎 Filtering with Query:', `"${this.searchQuery}"`);
    
    if (!this.searchQuery) {
      this.filteredProducts = [...this.allProducts]; 
    } else {
      this.filteredProducts = this.allProducts.filter(product =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  
    console.log('✅ Filtered Products:', this.filteredProducts);
  }
  goToDetails(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  getStars(rate: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < Math.round(rate));
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert('Product added to cart!');
  }
}
