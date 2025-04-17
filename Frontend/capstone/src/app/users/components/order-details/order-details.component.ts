import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartService } from '../cart/services/cart/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderId: string | null = null;
  orderDetails: any;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
      if (this.orderId) {
        this.loadOrderDetails();
    }
    });
  }

  loadOrderDetails(): void {
    if (this.orderId) {
      this.loading = true;
      this.error = null;

      this.cartService.getOrderDetails(this.orderId).subscribe(
        (data) => {
          console.log(this.orderDetails);
          this.orderDetails = data;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching order details:', error);
          if (error.status === 404) {
            this.error = `Order with ID "${this.orderId}" not found.`;
          } else {
            this.error = 'Failed to load order details. Please try again later.';
          }
          this.loading = false;
        }
      );
    } else {
      this.error = 'Invalid order ID.';
    }
  }

  onBack() {
    this.router.navigate(['']);
  }
}
