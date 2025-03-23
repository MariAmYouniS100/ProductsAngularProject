// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { Product } from '../../models/product.model';

// @Component({
//   selector: 'app-products',
//   imports: [CommonModule],
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsComponent {
//   products: Product[] = [
//     { id: 1, name: 'Laptop', price: 15000, image: 'assets/images/laptop.peg.jpeg', stock: 5, rate: 4.5 },
//     { id: 2, name: 'Smartphone', price: 10000, image: 'assets/images/phone.jpeg', stock: 2, rate: 4.2 },
//     { id: 3, name: 'Tablet', price: 8000, image: 'assets/images/taplet.jpeg', stock: 0, rate: 2 },
//     { id: 4, name: 'Smartwatch', price: 3000, image: 'assets/images/smartwatch.jpeg', stock: 8, rate: 1 },
//     { id: 6, name: 'Wireless Earbuds', price: 3500, image: 'assets/images/earbuds.jpeg', stock: 15, rate: 4.6 },
//     { id: 7, name: 'Gaming Mouse', price: 1200, image: 'assets/images/mouse.jpeg', stock: 7, rate: 4.3 },
//     { id: 8, name: 'Mechanical Keyboard', price: 5000, image: 'assets/images/keyboard.jpeg', stock: 10, rate: 4.8 },
//     { id: 9, name: 'Monitor', price: 9000, image: 'assets/images/monitor.jpeg', stock: 6, rate: 4.5 },
//     { id: 10, name: 'External Hard Drive', price: 7000, image: 'assets/images/harddrive.jpeg', stock: 4, rate: 4.1 },
    
//   ];

//   constructor(private router: Router) {}

//   goToDetails(productId: number) {
//     this.router.navigate(['/product', productId]);
//   }

//   getStars(rate: number): boolean[] {
//     return Array(5).fill(false).map((_, i) => i < Math.round(rate));
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  hoverState: { [key: number]: boolean } = {}; 
  products: Product[] = [];
  loading = true;
  errorMessage = '';

  constructor(private productService: ProductService, 
    private router: Router,
    private cartService: CartService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.products;
        this.loading = false;
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
    return Array(5)
      .fill(false)
      .map((_, i) => i < Math.round(rate));
  }
  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert('Product added to cart!');
  
}
  
}
