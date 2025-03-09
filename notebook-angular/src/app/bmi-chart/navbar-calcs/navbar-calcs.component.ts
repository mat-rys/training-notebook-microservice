import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/security-config/auth.service';

@Component({
  selector: 'navbar-calcs',
  templateUrl: './navbar-calcs.component.html',
  styleUrls: ['./navbar-calcs.component.css']
})
export class NavbarCalcsComponent {
  logoPath = "assets\\Training Notebook-logos.png";
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.removeToken(); // Usuwa token i sesje
  }
}