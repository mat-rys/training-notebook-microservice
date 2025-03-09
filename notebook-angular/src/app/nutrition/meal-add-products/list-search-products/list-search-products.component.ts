import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Product } from '../models/product.model';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-search-products',
  templateUrl: './list-search-products.component.html',
  styleUrls: ['./list-search-products.component.css']
})
export class ListSearchProductsComponent {
  @Input() products!: Product[];
  @Input() searchQuery: string = '';
  @Output() deleteProduct = new EventEmitter<Product>();
  @Output() sendEditProduct = new EventEmitter<Product>();
  @Output() addProductToMeal = new EventEmitter<Product>();

  filteredProducts: Product[] = []; 
  private searchTerms = new Subject<string>();
  editingProduct: Product | null = null;

  constructor() {
    this.searchTerms.pipe(debounceTime(600)).subscribe(query => {
      this.searchProducts();
    });
  }

  updateSearchQuery(query: string) {
    this.searchQuery = query;
    this.searchTerms.next(query);
  }

  onDeleteProduct(product: Product) {
    confirm('Czy na pewno chcesz usunąć ten produkt?') ? this.deleteProduct.emit(product) : null;
  }

  onAddProductToMeal(product: Product) {
    this.addProductToMeal.emit(product)
  }

  searchProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().startsWith(this.searchQuery.toLowerCase())
    );
  }

  editProduct(product: Product) {
    this.editingProduct = { ...product };
  }

  onUpdateProduct() {
    if (this.editingProduct) {
      this.sendEditProduct.emit(this.editingProduct);
    }
    this.editingProduct = null;
  }
  

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  cancelEdit() {
    this.editingProduct = null;
  }
}