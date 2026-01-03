import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { ChatComponent } from './pages/chat/chat';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'chat', component: ChatComponent, canActivate: [authGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];