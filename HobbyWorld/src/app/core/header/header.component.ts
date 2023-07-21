import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) { }


  get isLoggedIn(): boolean {
    return this.authService.isLogged;
  }

  get username(): string {
    return this.authService.user?.username || '';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
