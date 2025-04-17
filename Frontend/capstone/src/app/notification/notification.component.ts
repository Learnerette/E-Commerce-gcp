import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="message" class="notification" [ngClass]="type">
      {{ message }}
    </div>
  `,
  styles: [
    `
      .notification {
        padding: 12px 20px; /* Increased padding for better visual balance */
        margin-bottom: 12px; /* Slightly increased margin */
        border-radius: 4px; /* More subtle rounded corners */
        font-size: 0.9rem; /* Slightly smaller font size for a cleaner look */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08); /* Subtle shadow for depth */
        animation: fadeIn 0.3s ease-out; /* Smooth fade-in animation */
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-5px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .success {
        background-color: #e9faef; /* Lighter green */
        color: #34a853; /* Darker green for better contrast */
        border: 1px solid #baf2c4; /* Muted border color */
      }

      .error {
        background-color: #fdeded; /* Lighter red */
        color: #e53935; /* Darker red for better contrast */
        border: 1px solid #f5aaaa; /* Muted border color */
      }

      .info {
        background-color: #e3f2fd; /* Lighter blue */
        color: #1e88e5; /* Darker blue for better contrast */
        border: 1px solid #bbdefb; /* Muted border color */
      }

      /* Add a close button (optional) */
      .notification .close-button {
        float: right;
        cursor: pointer;
        color: inherit; /* Inherit color from the notification */
        font-size: 1.2rem;
        line-height: 1;
        text-decoration: none;
      }
    `,
  ],
})
export class NotificationComponent {
  @Input() message: string | null = null;
  @Input() type: 'success' | 'error' | 'info' = 'info';
}
