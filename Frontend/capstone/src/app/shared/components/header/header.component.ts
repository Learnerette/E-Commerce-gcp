import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category/category.service';
import { AuthService } from '../../../admin/auth/services/auth/authservice.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  selectedCategory: string = '';
  categories: string[] = []; 

  constructor(private router: Router, private categoryService: CategoryService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.admin$.subscribe(adminId => {
      this.isLoggedIn = !!adminId;
    });

    this.categoryService.categories$.subscribe((categories) => {
      this.categories = categories;
    });
  }

  onCategoryChange(event: Event): void {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    this.categoryService.setCategory(selectedCategory === 'All' ? null : selectedCategory);
  }

  navItems = [
    { path: '/', label: 'Home' },
    { path: '/cart', label: 'Cart' },
    { path: '/admin/products', label: 'Product-Manager' },
    { path: '/about', label: 'About Us' }
  ];

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/auth/login']);
  }
}
