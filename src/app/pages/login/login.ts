import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Needed for forms
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from '../../interfaces/auth.interfaces';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule here
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  loginData: LoginRequest = {
    email: '',
    password: ''
  };

  onSubmit() {
    // Call the API
    this.authService.login(this.loginData).subscribe({
      next: (response: LoginResponse) => {
        this.authService.saveToken(response.token);

        console.log('Login successful!', response);
        // alert('Login Success! Token saved.');
        this.router.navigate(['/dashboard']);

      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Login Failed: Invalid Email or Password');
      }
    });
  }
}