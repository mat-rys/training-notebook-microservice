import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  logoPath = "assets\\Training Notebook-logos_transparent.png";
  womenRegistration = "assets\\women_training.png";
  user: any = {}; // Tutaj przechowujesz dane użytkownika

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.http.get<any>('http://localhost:8222/account/user')
      .subscribe(data => {
        this.user = data;
      });
  }
}
