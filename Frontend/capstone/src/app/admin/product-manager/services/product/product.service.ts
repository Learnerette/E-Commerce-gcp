import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //Base URL To Connect to Backend
  private backendUrl = 'http://localhost:8080/api/v1/admin/products'; 

  constructor(private http: HttpClient) {}
  //Get Method to retrieve all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.backendUrl}`);
  }
  //Retrieving the Product By product id to view details of product
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.backendUrl}/${id}`);
  }
  //Creates a new product on the backend.
  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(`${this.backendUrl}`, product);
  }
  //PUT method to update product details by using product id.
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.backendUrl}/${product.id}`, product);
  }
  //Deleting the product by product id
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.backendUrl}/${productId}`);
  }
}
