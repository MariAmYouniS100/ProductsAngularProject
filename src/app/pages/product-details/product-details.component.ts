// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { Product } from '../../models/product.model';

// @Component({
//   selector: 'app-product-details',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './product-details.component.html',
//   styleUrls: ['./product-details.component.css']
// })
// export class ProductDetailsComponent implements OnInit {
//   product: Product | undefined;

//   products: Product[] = [
//     {
//       id: 1,
//       name: 'Laptop',
//       price: 15000,
//       image: 'assets/images/laptop.peg.jpeg',
//       stock: 5,
//       rate: 4.5,
//       category: 'Electronics',
//       brand: 'Brand A',
//       description: 'A high-performance laptop with powerful specs for work and gaming.'
//     },
//     {
//       id: 2,
//       name: 'Smartphone',
//       price: 10000,
//       image: 'assets/images/phone.jpeg',
//       stock: 2,
//       rate: 4.2,
//       category: 'Electronics',
//       brand: 'Brand B',
//       description: 'A flagship smartphone with an advanced camera and fast processor.'
//     },
//     {
//       id: 3,
//       name: 'Tablet',
//       price: 8000,
//       image: 'assets/images/taplet.jpeg',
//       stock: 0,
//       rate: 2,
//       category: 'Electronics',
//       brand: 'Brand C',
//       description: 'A versatile tablet for entertainment, work, and creativity.'
//     },
//     {
//       id: 4,
//       name: 'Smartwatch',
//       price: 3000,
//       image: 'assets/images/smartwatch.jpeg',
//       stock: 8,
//       rate: 1,
//       category: 'Wearables',
//       brand: 'Brand D',
//       description: 'A stylish smartwatch with health tracking and notifications.'
//     },{ 
//       id: 6,
//       name: 'Wireless Earbuds',
//       price: 3500,
//       image: 'assets/images/earbuds.jpeg',
//       stock: 15,
//       rate: 4.6,
//       category: 'Audio',
//       brand: 'Brand X',
//       description: 'Compact and high-quality wireless earbuds with noise cancellation and long battery life.'
//     },
//     { 
//       id: 7,
//       name: 'Gaming Mouse',
//       price: 1200,
//       image: 'assets/images/mouse.jpeg',
//       stock: 7,
//       rate: 4.3,
//       category: 'Gaming Accessories',
//       brand: 'Brand Y',
//       description: 'Ergonomic gaming mouse with customizable RGB lighting and high-precision sensor.'
//     },
//     { 
//       id: 8,
//       name: 'Mechanical Keyboard',
//       price: 5000,
//       image: 'assets/images/keyboard.jpeg',
//       stock: 10,
//       rate: 4.8,
//       category: 'Gaming Accessories',
//       brand: 'Brand Z',
//       description: 'Durable mechanical keyboard with customizable RGB lighting and tactile switches for a premium typing experience.'
//     }
    
//   ];

//   constructor(private route: ActivatedRoute) {}

//   ngOnInit() {
//     const productId = Number(this.route.snapshot.paramMap.get('id'));
//     this.product = this.products.find(p => p.id === productId);
//   }

//   getStars(): boolean[] {
//     return Array(5)
//       .fill(false)
//       .map((_, i) => i < Math.round(this.product?.rate ?? 0)); 
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  apiUrl = 'https://dummyjson.com/products/';

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private productService: ProductService,
              private cartService: CartService) {}
    
  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (!productId) {
      console.error('Invalid product ID');
      return;
    }

    this.fetchProductDetails(productId);
  }
  addToCart(product: any) {
      this.cartService.addToCart(product);
      alert('Product added to cart!');
    
  }
  

  fetchProductDetails(productId: number) {
    this.http.get<Product>(`${this.apiUrl}${productId}`).subscribe({
      next: (data) => (this.product = data),
      error: (err) => console.error('Error fetching product:', err)
    });
  }

  getStars(): boolean[] {
    if (!this.product || this.product.rating=== undefined) return [];
    return Array(5).fill(false).map((_, i) => i < Math.round(this.product!.rating));
  }
}  
