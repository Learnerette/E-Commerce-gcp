import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartService } from '../users/components/cart/services/cart/cart.service';
import { CategoryService } from '../shared/services/category/category.service';
import { ProductService } from '../admin/product-manager/services/product/product.service';
import { Product } from '../admin/product-manager/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  categories = ['All', 'Mobile', 'Laptop', 'Headphone'];
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  notificationMessage: string | null = null;
  notificationType: 'success' | 'error' | 'info' = 'info'; 

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {}

  addToCart(product: any): void {
    this.cartService.addToCart(product.id, 1).subscribe({
      next: (response: any) => {
        this.notificationMessage = `${product.name} has been added to the cart!`; 
        this.notificationType = 'success';
        setTimeout(() => this.clearNotification(), 3000); 
      },
      error: (err: any) => {
        console.error('Error adding to cart:', err);
        this.notificationMessage = `Error adding ${product.name} to the cart. Please try again.`; 
        this.notificationType = 'error';
        setTimeout(() => this.clearNotification(), 5000); 
      }
    });
  }

  ngOnInit(): void {
    this.loadProducts();

    this.categoryService.category$.subscribe((category) => {
      if (category) {
        this.filteredProducts = this.products.filter((product) => product.category === category);
      } else {
        this.filteredProducts = this.products;
      }
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.filteredProducts = products;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error loading products:', err);
        this.errorMessage = 'Error loading products. Please try again.';
        this.isLoading = false;
      }
    });
  }

  viewProductDetails(productId: number): void {
    this.router.navigate(['/product-view', productId]);
  }

  clearNotification(): void { 
    this.notificationMessage = null;
  }
}
