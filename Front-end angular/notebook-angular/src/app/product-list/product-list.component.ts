import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  logoPath = 'assets\\Training Notebook-logos.png';
  ramenPhoto = 'assets\\ramen.jpg';
  searchQuery: string = ''; // Pole do przechowywania wyszukiwanej frazy
  products: Product[] = [];
  filteredProducts: Product[] = []; // Przechowuje przefiltrowane produkty
  editingProduct: Product | null = null; // Notatka, która jest obecnie edytowana
  token = this.authService.getToken();

  constructor(private authService: AuthService,private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  logout() {
    this.authService.removeToken();
  }
  
  searchProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().startsWith(this.searchQuery.toLowerCase())
    );
  }

  loadProducts() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = 'http://localhost:8222/nutrition/products';
    this.http.get<Product[]>(url, { headers }).subscribe((data) => {
      this.products = data;
    });
  }

  
  deleteProduct(product: Product) {
    const deleteHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    this.http.delete(`http://localhost:8222/nutrition/products/${product.id}`, { headers: deleteHeaders })
      .subscribe(() => {
        this.loadProducts();
      }, error => {
        console.error('Błąd podczas usuwania notatki:', error);
      });
  }

  deleteProductConfirmation(product: Product) {
    if (confirm('Czy na pewno chcesz usunąć ten produkt?')) {
      this.deleteProduct(product);
    }
  }


  editProduct(product: Product) {
    this.editingProduct = { ...product };
  }

  updateProduct() {
    if (this.editingProduct) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      });

      this.http.put(`http://localhost:8222/nutrition/products/${this.editingProduct.id}`, this.editingProduct, { headers })
        .subscribe(response => {
          this.loadProducts();
          this.editingProduct = null;
        }, error => {
          console.error('Error updating product:', error);
        });
    }
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}






