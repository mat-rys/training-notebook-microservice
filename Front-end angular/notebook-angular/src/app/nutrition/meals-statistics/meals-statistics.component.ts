import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security-config/auth.service';

@Component({
  selector: 'app-meals-statistics',
  templateUrl: './meals-statistics.component.html',
  styleUrls: ['./meals-statistics.component.css']
})
export class MealsStatisticsComponent implements OnInit {
  options = ['Najczęściej używane produkty', 'Ilość posiłków dziennie', 'Średnia ilość spożywanych kalorii'];
  selectedOption!: string;
  statistics: any;
  startDate!: string;
  endDate!: string;

  constructor(private authService: AuthService,  private router: Router) {}

  ngOnInit(): void {
  }

  handleLogout(){
    this.authService.removeToken();
  }

  loadStatistics() {
    switch(this.selectedOption) {
      case 'Najczęściej używane produkty':
        break;
      case 'Ilość posiłków dziennie':
        break;
      case 'Średnia ilość spożywanych kalorii':
        break;
    }
  }
}
