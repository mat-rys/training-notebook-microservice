import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../security-config/auth.service';
import { Photo } from '../models/photo.model';
import { Body } from '../models/body-profil.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private token = this.authService.getToken();

  constructor(private authService: AuthService, private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  }

  loadPhoto() {
    return this.http.get<Photo>('http://localhost:8222/body/photo', { headers: this.getHeaders() });
  }

  loadUser() {
    return this.http.get<any[]>('http://localhost:8222/account/user', { headers: this.getHeaders() });
  }

  loadBodyProfil() {
    return this.http.get<Body>('http://localhost:8222/body/get', { headers: this.getHeaders() });
  }

  updateImage(updatedImageUrl: string) {
    return this.http.post('http://localhost:8222/body/photo', { photoUrl: updatedImageUrl }, { headers: this.getHeaders() });
  }

  updateBodyProfile(fieldName: string, updatedValue: any) {
    const apiEndpoint = `http://localhost:8222/body/${fieldName}`;
    return this.http.put(apiEndpoint, updatedValue, { headers: this.getHeaders() });
  }

  updateField(fieldName: string, updatedValue: any) {
    const apiEndpoint = `http://localhost:8222/account/user/${fieldName}`;
    return this.http.put(apiEndpoint, updatedValue, { headers: this.getHeaders() });
  }
}
