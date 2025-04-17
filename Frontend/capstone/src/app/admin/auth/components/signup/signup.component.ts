import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/authservice.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  isLoading = false;
  error: string | null = null;

  constructor(public authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.authService.authForm.invalid) {
      return;
    }

    this.isLoading = true;
    const email = this.authService.authForm.value.email;
    const password = this.authService.authForm.value.password;

    this.authService.signup({ email: email, password: password }).subscribe({
      next: resData => {
        console.log(resData);
        this.isLoading = false;
        this.error = null;
        this.authService.authForm.reset();
        this.router.navigate(['/admin/auth/login']); // Redirect to login page
      },
      error: errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    });
  }
}
