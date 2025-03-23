import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private router: Router) {} 
  onSubmit(form: any) {
    if (form.valid) {
      this.router.navigate(['/products']);
    } else {
      alert('Please fill in the form correctly.');
    }
  }
}
