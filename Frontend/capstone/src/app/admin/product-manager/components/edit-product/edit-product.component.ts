import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], 
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  productId: number = 0;
  product: Product | null = null;
  errorMessage: string | null = null;
  notificationMessage: string | null = null; 
  notificationType: 'success' | 'error' | 'info' = 'info'; 

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.loadProduct();
    });
  }

  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (product: Product) => {
        if (product) {
          this.product = product;
        } else {
          this.errorMessage = 'Product not found.';
        }
      },
      error: (err: any) => {
        console.error('Error loading product:', err);
        this.errorMessage = 'Error loading product. Please check the console for details.';
      }
    });
  }

  onSubmit(): void {
    if (this.product) {
      this.productService.updateProduct(this.product).subscribe({
        next: (updatedProduct: Product) => {
          console.log('Product updated successfully:', updatedProduct);
          this.notificationMessage = 'Product updated successfully!';
          this.notificationType = 'success';
          setTimeout(() => {
            this.notificationMessage = null;
            this.router.navigate(['/admin/products/list']); 
          }, 3000);
        },
        error: (err: any) => {
          console.error('Error updating product:', err);
          this.errorMessage = 'Error updating product. Please check the console for details.';
          this.notificationType = 'error';
          setTimeout(() => this.notificationMessage = null, 5000);
        }
      });
    } else {
      this.errorMessage = 'No product to update.';
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/admin/products/list']);
  }
}
