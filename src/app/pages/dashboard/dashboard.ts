import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  
  userEmail: string = '';
  userName: string = '';

  ngOnInit(): void {
    if (!this.authService.getToken()) {
      this.router.navigate(['/login']);
      return;
    }

    // Get User Details from the Token
    const user = this.authService.getUserDetail();
    
    if (user) {
      this.userName = user.username;
      this.userEmail = user.email;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}