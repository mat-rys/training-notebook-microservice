import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'navbar-account',
  templateUrl: './navbar-account.component.html',
  styleUrls: ['./navbar-account.component.css']
})
export class NavbarAccountComponent {
  logoPath = "assets\\Training Notebook-logos.png";
  @Output() logout = new EventEmitter<void>();

  onLogout() {
    this.logout.emit();
  }
}
