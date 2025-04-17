import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../cart/services/cart/cart.service';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addressForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router,private cartService:CartService) {
    this.addressForm = this.fb.group({
      fullName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{6}(?:[-\s]\d{4})?$/)]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.addressForm.valid) {
      const addressData = this.addressForm.value;
      this.cartService.checkout(addressData).subscribe(
        (order) => {
          console.log("Order created:", order);
          console.log(order.id);
          this.router.navigate(['/order-details', order.id]);
        },
        (error) => {
          console.error('Error placing order:', error);
        }
      );
    } else {
      console.log("form invalid");
    }
  }
}
