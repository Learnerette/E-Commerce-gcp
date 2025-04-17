import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/v1'; 

  private categoriesSubject = new BehaviorSubject<string[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  private categorySubject = new BehaviorSubject<string | null>(null);
  category$ = this.categorySubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCategories();
  }

  loadCategories(): void {
    this.http.get<string[]>(`${this.baseUrl}/categories`).subscribe(
      (categories) => {
        this.categoriesSubject.next(categories);
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  setCategory(category: string | null): void {
    this.categorySubject.next(category);
  }
}
