import { Component } from '@angular/core';
import { Product } from './models/product.model';
import { CommonModule } from '@angular/common'; // ✅ Import this
// import { ProductCardComponent } from './components/product-card/product-card.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './about/about.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, 
  imports: [CommonModule, NavbarComponent, RouterModule,FooterComponent,],
  template: `
    <app-navbar></app-navbar> 
    <router-outlet></router-outlet> 
  `, 
})
export class AppComponent {
  title = 'products';
 
 
}
