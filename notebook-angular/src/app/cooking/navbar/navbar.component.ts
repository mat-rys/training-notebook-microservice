import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/security-config/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  logoPath = "assets\\Training Notebook-logos.png";
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.removeToken(); // Usuwa token i sesje
  }
}
