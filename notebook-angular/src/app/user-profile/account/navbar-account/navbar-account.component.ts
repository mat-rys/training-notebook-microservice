import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/security-config/auth.service';

@Component({
  selector: 'navbar-account',
  templateUrl: './navbar-account.component.html',
  styleUrls: ['./navbar-account.component.css']
})
export class NavbarAccountComponent {
  logoPath = "assets\\Training Notebook-logos.png";
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.removeToken(); // Usuwa token i sesje
  }
}
