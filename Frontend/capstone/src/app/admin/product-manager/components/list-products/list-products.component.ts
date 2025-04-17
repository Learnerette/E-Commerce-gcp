
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule, Router } from '@angular/router';
// import { Product } from '../../models/product.model';
// import { ProductService } from '../../services/product/product.service';
// import { CategoryService } from '../../../../shared/services/category/category.service';

// @Component({
//   selector: 'app-list-products',
//   standalone: true,
//   imports: [CommonModule, RouterModule], 
//   templateUrl: './list-products.component.html',
//   styleUrl: './list-products.component.css'
// })
// export class ListProductsComponent implements OnInit {
//   products: Product[] = [];
//   filteredProducts: Product[] = [];
//   errorMessage: string | null = null;
//   isLoading: boolean = true;
//   selectedCategory: string | null = null;
//   notificationMessage: string | null = null; 
//   notificationType: 'success' | 'error' | 'info' = 'info'; 

//   constructor(private productService: ProductService, private router: Router, private categoryService: CategoryService) {}

//   ngOnInit(): void {
//     this.categoryService.category$.subscribe((category) => {
//       this.selectedCategory = category;
//       this.loadProducts(); 
//     });
//   }

//   loadProducts(): void {
//     this.isLoading = true;
//     this.productService.getProducts().subscribe({
//       next: (products: Product[]) => {
//         this.products = products;
//         this.filterProducts(); 
//         this.isLoading = false;
//       },
//       error: (err: any) => {
//         console.error('Error loading products:', err);
//         this.errorMessage = 'Error loading products. Please try again.';
//         this.isLoading = false;
//       }
//     });
//   }

//   filterProducts(): void {
//     if (this.selectedCategory && this.selectedCategory !== 'All') {
//       this.filteredProducts = this.products.filter((product) => product.category === this.selectedCategory);
//     } else {
//       this.filteredProducts = this.products; // Show no products if no category is selected
//     }
//   }

//   editProduct(productId: number): void {
//     this.router.navigate(['/admin/products/edit', productId]);
//   }

//   deleteProduct(productId: number): void {
//     this.productService.deleteProduct(productId).subscribe({
//       next: () => {
//         this.notificationMessage = 'Product deleted successfully!'; // Set success message
//         this.notificationType = 'success';
//         setTimeout(() => this.notificationMessage = null, 3000); // Clear notification after 3 seconds
//         this.loadProducts(); // Reload products after deleting
//       },
//       error: (err: any) => {
//         console.error('Error deleting product:', err);
//         this.errorMessage = 'Error deleting product. Please try again.';
//         this.notificationType = 'error';
//         setTimeout(() => this.notificationMessage = null, 5000);
//       }
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product/product.service';
import { CategoryService } from '../../../../shared/services/category/category.service';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  errorMessage: string | null = null;
  isLoading: boolean = true;
  selectedCategory: string | null = null;
  notificationMessage: string | null = null;
  notificationType: 'success' | 'error' | 'info' = 'info';

  constructor(private productService: ProductService, private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.category$.subscribe((category) => {
      this.selectedCategory = category;
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.filterProducts();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error loading products:', err);
        this.errorMessage = 'Error loading products. Please try again.';
        this.isLoading = false;
      }
    });
  }

  filterProducts(): void {
    if (this.selectedCategory && this.selectedCategory !== 'All') {
      this.filteredProducts = this.products.filter((product) => product.category === this.selectedCategory);
    } else {
      this.filteredProducts = this.products; // Show no products if no category is selected
    }
  }

  editProduct(productId: number): void {
    this.router.navigate(['/admin/products/edit', productId]);
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.notificationMessage = 'Product deleted successfully!'; // Set success message
          this.notificationType = 'success';
          setTimeout(() => this.notificationMessage = null, 3000); // Clear notification after 3 seconds
          this.loadProducts(); // Reload products after deleting
        },
        error: (err: any) => {
          console.error('Error deleting product:', err);
          this.errorMessage = 'Error deleting product. Please try again.';
          this.notificationType = 'error';
          setTimeout(() => this.notificationMessage = null, 5000);
        }
      });
    }
  }
}
