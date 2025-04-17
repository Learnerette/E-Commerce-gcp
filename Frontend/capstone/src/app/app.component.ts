import { Component } from '@angular/core';
import { RouterModule, RouterOutlet} from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component'; 
import { FooterComponent } from './shared/components/footer/footer.component';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'E-Commerce';
}