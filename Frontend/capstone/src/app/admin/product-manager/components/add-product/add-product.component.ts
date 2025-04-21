import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product/product.service';
import { NotificationComponent } from '../../../../notification/notification.component';
import { CategoryService } from '../../../../shared/services/category/category.service';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NotificationComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductsComponent {
  // Omit used to ensure that the id property is not included when creating a new product..
  newProduct: Omit<Product, 'id'> = { name: '', quantity: 0, price: 0, description: '', category: '' }; // Omit id
  errorMessage: string | null = null;
  notificationMessage: string | null = null;
  categories: string[] = [];
  notificationType: 'success' | 'error' | 'info' = 'info';

  //@ViewChild('myForm') productForm!: NgForm;
  // Inject dependencies: ProductService, Router, and CategoryService
  constructor(private productService: ProductService, private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    // Fetch categories from the backend
    this.categoryService.categories$.subscribe((categories) => {
       // Updating the categories array with fetched data
      this.categories = categories;
    });
  }

  clearForm(): void {
    this.newProduct = { name: '', quantity: 0, price: 0, description: '', category: '' }; // Omit id
    this.errorMessage = null;
    this.notificationMessage = null;
    this.productForm.resetForm(); // Reset the NgForm
  }
  
  //Adding  a new product using the ProductService
  addProduct(): void {
    this.errorMessage = null;
    this.notificationMessage = null;

    if (!this.newProduct.name || !this.newProduct.category) {
      this.errorMessage = 'Please enter product name and category.';
      return;
    }
     //Checking in the console whether the product added successfully or not.
    console.log('Adding product:', this.newProduct);

    this.productService.createProduct(this.newProduct).subscribe({
      next: (newProduct: Product) => {
        console.log('Product added successfully:', newProduct);
        this.notificationMessage = 'Product added successfully!';
        this.notificationType = 'success';
          //Displaying the notification message for 3seconds and navigating to products-list.
        setTimeout(() => {
          this.notificationMessage = null;
          this.router.navigate(['/admin/products/list']);
        }, 3000);

        this.productForm.resetForm(); // Reseting the Form after successful product addition

      },
      error: (err: any) => {
        console.error('Error adding product:', err);
        this.errorMessage = 'Error adding product. Please check the console for details.';
        this.notificationType = 'error';
        //Displaying the notification message for 5seconds
        setTimeout(() => this.notificationMessage = null, 5000);
      }
    });
  }
}
