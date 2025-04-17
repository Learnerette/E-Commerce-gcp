import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="not-found-container">
      <div class="not-found-content">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <a routerLink="/" class="btn btn-primary">Go Home</a>
      </div>
    </div>
  `,
  styles: `
   .not-found-container {
  display: flex;
  justify-content: center;
  align-items: center; 
  height: 100vh; 
  text-align: center; 
}

.not-found-content {
  padding: 20px;
  background-color: #f8f9fa; 
  border-radius: 5px;
}

  `,
})
export class NotFoundComponent {}
