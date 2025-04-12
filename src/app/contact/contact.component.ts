import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [CommonModule, FormsModule] // ✅ Importing FormsModule for form handling
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';

  submitForm() {
    console.log('📩 Form Submitted:', { name: this.name, email: this.email, message: this.message });
    alert('Thank you for contacting us! We will get back to you soon.');
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
