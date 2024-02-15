import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../security-config/auth.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  logoPath = 'assets\\Training Notebook-logos.png';
  ramenPhoto = 'assets\\ramen.jpg';

  calories: number = 0; 
  title: string = ''; 
  grams: number = 0; 
  carbs: number = 0; 
  protein: number = 0; 
  fat: number = 0; 
  productCreated: boolean = false;
  productError: boolean = false; // Dodaj zmienną do obsługi komunikatu o błędzie
  token = this.authService.getToken();

  constructor(private authService: AuthService,private http: HttpClient) {}
  ngOnInit(): void {}

  logout() {
    this.authService.removeToken();
  }
  
  createProduct() {
    if (!this.title.trim() || this.calories < 0 || this.grams < 0 || this.carbs < 0 || this.protein < 0 || this.fat < 0) {
      this.productError = true; // Wyświetl komunikat o błędzie
      setTimeout(() => {
        this.productError = false; // Schowaj komunikat o błędzie po 3 sekundach
      }, 1500);
      return;
    }

    const newProduct = {
      title: this.title,
      calories: this.calories,
      grams: this.grams,
      carbs: this.carbs,
      protein: this.protein,
      fat: this.fat
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    this.http
      .post('http://localhost:8222/nutrition/products', newProduct, {
        headers: headers,
      })
      .subscribe(
        (response) => {
          this.productCreated = true;
          setTimeout(() => {
            this.productCreated = false; // Schowaj wiadomość po 3 sekundach
          }, 1500);
          // Wyczyść wszystkie pola input po 3 sekundach
          setTimeout(() => {
            this.title = '';
            this.calories = 0;
            this.grams = 0;
            this.carbs = 0;
            this.protein = 0;
            this.fat = 0;
          }, 1500);
        },
        (error) => {
          console.error('An error occurred while creating the product.', error);
          this.productError = true; // Wyświetl komunikat o błędzie
          setTimeout(() => {
            this.productError = false; // Schowaj komunikat o błędzie po 3 sekundach
          }, 1500);
        }
      );
  }
}
