import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'navbar-calcs',
  templateUrl: './navbar-calcs.component.html',
  styleUrls: ['./navbar-calcs.component.css']
})
export class NavbarCalcsComponent {
  logoPath = "assets\\Training Notebook-logos.png";
  @Output() logout = new EventEmitter<void>();

  onLogout() {
    this.logout.emit();
  }
}