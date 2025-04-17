import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface AuthResponseData {
  adminId: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authForm: FormGroup;
  admin$ = new BehaviorSubject<string | null>(this.getAdminIdFromLocalStorage());
  private backendUrl = 'http://localhost:8080/api/v1/admin/auth'; 

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  private getAdminIdFromLocalStorage(): string | null {
    return localStorage.getItem('adminId');
  }

  private saveAdminIdToLocalStorage(adminId: string): void {
    localStorage.setItem('adminId', adminId);
    this.admin$.next(adminId);
  }

  private removeAdminIdFromLocalStorage(): void {
    localStorage.removeItem('adminId');
    this.admin$.next(null);
  }

  signup(credentials: any): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${this.backendUrl}/signup`, credentials)
      .pipe(
        tap(resData => {
          this.saveAdminIdToLocalStorage(resData.adminId);
        }),
        catchError(this.handleError)
      );
  }

  login(credentials: any): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${this.backendUrl}/login`, credentials)
      .pipe(
        tap(resData => {
          this.saveAdminIdToLocalStorage(resData.adminId);
          this.router.navigate(['/products']); 
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    this.removeAdminIdFromLocalStorage();
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getAdminIdFromLocalStorage();
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message || error.message}`;
    }
    return throwError(() => errorMessage);
  }
}
