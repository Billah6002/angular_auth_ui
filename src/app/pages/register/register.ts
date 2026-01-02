import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterRequest, MessageResponse } from '../../interfaces/auth.interfaces';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);

  registerData: RegisterRequest = {
    username: '',
    email: '',
    password: ''
  };

  onSubmit() {
    this.authService.register(this.registerData).subscribe({
      next: (res: MessageResponse) => {
        alert('Registration Successful! Please Login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert(err.error.message || 'Registration Failed');
      }
    });
  }
}