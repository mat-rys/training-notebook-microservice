import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../products-list/models/product.model';
import { AuthService } from '../../security-config/auth.service';
import { NewProduct } from '../product-add/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url = 'http://localhost:8222/nutrition/products';
  private token = this.authService.getToken();
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });

  constructor(private http: HttpClient, private authService: AuthService) { }

  loadProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url, { headers: this.headers });
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`, { headers: this.headers });
  }

  updateProduct(id: number, product: Product): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, product, { headers: this.headers });
  }

  createProduct(product: NewProduct): Observable<Product> {
    return this.http.post<Product>(this.url, product, { headers: this.headers });
  }
}