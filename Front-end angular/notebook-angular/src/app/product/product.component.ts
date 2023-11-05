import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

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
  token = this.authService.getToken();

  constructor(private authService: AuthService,private http: HttpClient) {}
  ngOnInit(): void {}

  logout() {
    this.authService.removeToken();
  }
  
  createProduct() {
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
        },
        (error) => {
          console.error('Wystąpił błąd podczas tworzenia produktu.', error);
        }
      );
  }
}