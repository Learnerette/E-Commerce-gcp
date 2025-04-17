import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8080/api/v1'; 
  private cartItemsKey = 'cartItems'; 

  constructor(private http: HttpClient) {
    this.cartItems = this.getCartItemsFromLocalStorage(); 
  }

  private cartItems: any[] = [];

  getCartItems(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/cart-items`);
  }

  addToCart(productId: number, quantity: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/manage-cart?productId=${productId}&quantity=${quantity}`, {}).pipe(
      tap(() => {
          this.updateCartItemsFromBackend();
      })
    );
  }
  

  getOrderDetails(orderId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders/${orderId}`);
  }
  clearCart(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/clear-cart`, {});
  }

  checkout(addressData: any): Observable<any> {
    // Send addressData in the request body
    return this.http.post<any>(`${this.baseUrl}/placeOrder`, addressData);
  }

  private getCartItemsFromLocalStorage(): any[] {
    const storedCartItems = localStorage.getItem(this.cartItemsKey);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  }

  private saveCartItemsToLocalStorage(): void {
    localStorage.setItem(this.cartItemsKey, JSON.stringify(this.cartItems));
  }

  private updateCartItemsFromBackend(): void {
      this.http.get<any[]>(`${this.baseUrl}/cart-items`).subscribe(
        (items) => {
          this.cartItems = items;
          this.saveCartItemsToLocalStorage();
        },
        (error) => {
          console.error('Error fetching cart items from backend:', error);
        }
      );
  }
}



