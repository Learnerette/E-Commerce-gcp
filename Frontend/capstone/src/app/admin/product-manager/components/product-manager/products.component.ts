import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-manager',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductManagerComponent {
  constructor(private productService: ProductService, private router: Router) {}

  goToAddProduct(): void {
    this.router.navigate(['/admin/products/add']);
  }

  goToListProducts(): void {
    this.router.navigate(['/admin/products/list']);
  }
}
