// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Product } from '../../../admin/product-manager/models/product.model';
// import { ProductService } from '../../../admin/product-manager/services/product/product.service';



// @Component({
//   selector: 'app-product-details',
//   imports: [CommonModule],
//   templateUrl: './product-details.component.html',
//   styleUrl: './product-details.component.css'
// })
// export class ProductDetailsComponent implements OnInit {
//   productId: number = 0;
//   product: Product | null = null;
//   errorMessage: string | null = null;

//   constructor(
//     private route: ActivatedRoute,
//     private productService: ProductService,
//     private router:Router) {}

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.productId = +params['id'];
//       this.loadProduct();
//     });
//   }

//   loadProduct(): void {
//     this.productService.getProductById(this.productId).subscribe({
//       next: (product: Product) => {
//         this.product = product;
//       },
//       error: (err: any) => {
//         console.error('Error loading product:', err);
//         this.errorMessage = 'Error loading product details. Please try again.';
//       }
//     });
//   }
//   goBack(): void {
//     this.router.navigate(['/']);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../admin/product-manager/services/product/product.service';
import { CartService } from '../cart/services/cart/cart.service';
import { Product } from '../../../admin/product-manager/models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports:[CommonModule,RouterModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId:number=0;
  product: any;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService // Injection CartService
  ) { }

     ngOnInit(): void {
        this.route.params.subscribe(params => {
          this.productId = +params['id'];
          this.loadProduct();
        });
      }
    
      loadProduct(): void {
        this.productService.getProductById(this.productId).subscribe({
          next: (product: Product) => {
            this.product = product;
          },
          error: (err: any) => {
            console.error('Error loading product:', err);
            this.errorMessage = 'Error loading product details. Please try again.';
          }
        });
      }

  goBack(): void {
    this.router.navigate(['']); // Or wherever you want to go back to
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product.id,1).subscribe(
        (response) => {
          console.log('Product added to cart:', response);
          // Optionally, show a success message or redirect to the cart
          alert('Product added to cart!');
        },
        (error) => {
          console.error('Error adding product to cart:', error);
          alert('Failed to add product to cart.');
        }
      );
    }
  }
}
