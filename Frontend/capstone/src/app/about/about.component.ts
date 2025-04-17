import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  companyInfo = {
    name: 'FastFlip',
    founded: 2025,
    mission: 'To provide high-quality products with exceptional service at affordable prices.',
    team: [
      {
        name: 'Padmaja',
        position: 'CEO & Founder',
        bio: 'Padmaja has leveraging years of expertise in retail and e-commerce.'
      },
      {
        name: 'Sruthi',
        position: 'CTO',
        bio: 'Sruthi leads our technology team with innovative solutions.'
      },
      {
        name: 'Madhumitha',
        position: 'Customer Experience Manager',
        bio: 'Madhumitha ensures every customer has an amazing shopping experience.'
      }
    ]
  };
}
