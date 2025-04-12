import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  hoverState: { [key: number]: boolean } = {}; 
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = true;
  errorMessage = '';
  searchQuery: string = ''; 

  constructor(
    private productService: ProductService, 
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    // ✅ Subscribe to search query on route change
    this.route.queryParams.subscribe(params => {
      console.log('Query Params:', params);  

      if (params['search']) {
        this.searchQuery = params['search'];
        console.log('Search Query:', this.searchQuery); 
      } else {
        this.searchQuery = ''; // ✅ Reset search if no query
      }

      this.filterProducts(); // ✅ Always filter when query changes
    });

    // ✅ Fetch products once
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.products || [];
        this.filteredProducts = [...this.products]; 
        this.loading = false;

        this.filterProducts(); // ✅ Apply filtering after products load
      },
      error: (error) => {
        this.errorMessage = 'Failed to load products.';
        console.error('Error fetching products:', error);
        this.loading = false;
      },
    });
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

  filterProducts() {
    console.log('Filtering products with query:', this.searchQuery);

    if (!this.searchQuery.trim()) {
      this.filteredProducts = [...this.products]; // ✅ Reset to all products
      console.log('No search query. Showing all products.');
      return;
    }

    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    console.log('Filtered Products:', this.filteredProducts);
  }
}
