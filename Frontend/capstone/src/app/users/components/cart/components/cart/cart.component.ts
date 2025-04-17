import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../services/cart/cart.service';
import { NotificationComponent } from '../../../../../notification/notification.component';

@Component({
  selector: 'app-cart',
  
  imports: [CommonModule, RouterModule, NotificationComponent, ReactiveFormsModule], 
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  showAddressForm: boolean = false; 
  orderId: string | null = null; // To store the order ID
  order: any | null = null;
  notificationMessage: string | null = null; 
  notificationType: 'success' | 'error' | 'info' = 'info'; 

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.loadCartItems();
    this.calculateTotalPrice();
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe(
      (items) => {
        this.cartItems = items;
        this.calculateTotalPrice();
      },
      (error) => {
        console.error('Error loading cart items:', error);
        this.notificationMessage = 'Error loading cart items. Please try again.';
        this.notificationType = 'error';
        setTimeout(() => this.clearNotification(), 5000);
      }
    );
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  updateQuantity(item: any, event: Event) {
    const newQuantity = Number((event.target as HTMLInputElement).value);
    if (newQuantity < 1) {
      this.notificationMessage = 'Quantity cannot be less than 1';
      this.notificationType = 'error';
      setTimeout(() => this.clearNotification(), 3000);
      return;
    }
    item.quantity = newQuantity;
    this.calculateTotalPrice();
  }

  placeOrder(): void {
    this.router.navigate(['/address']);
  }
  clearNotification(): void {
    this.notificationMessage = null;
  }

  onAddressSubmit(addressData: any): void {
    this.cartService.checkout(addressData).subscribe(
      (order) => {
        console.log("Order created:", order);
        this.order = order;
        this.router.navigate(['/order-details', order.Id]);
      },
      (error) => {
        console.error('Error placing order:', error);
      }
    );
    this.showAddressForm = false;
  }
  

  goBack(): void {
    this.router.navigate(['/']); 
  }
}
