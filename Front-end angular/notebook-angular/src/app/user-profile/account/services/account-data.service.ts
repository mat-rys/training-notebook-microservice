import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../security-config/auth.service';
import { Photo } from '../models/photo.model';
import { Body } from '../models/body-profil.model';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

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

  loadPhoto(): Observable<Photo> {
    return this.http.get<Photo>('http://localhost:8222/body/photo', { headers: this.getHeaders() });
  }

  loadUser(): Observable<User> {
    return this.http.get<User>('http://localhost:8222/account/user', { headers: this.getHeaders() });
  }
  
  loadBodyProfil(): Observable<Body> {
    return this.http.get<Body>('http://localhost:8222/body/get', { headers: this.getHeaders() });
  }

  updateImage(updatedImageUrl: string) {
    return this.http.post('http://localhost:8222/body/photo', { photoUrl: updatedImageUrl }, { headers: this.getHeaders() });
  }

  updateBodyProfile(fieldName: string, updatedValue: any) {
    const apiEndpoint = `http://localhost:8222/body/${fieldName}`;
    const bodyProfileDTO = {[fieldName]: updatedValue};
    return this.http.put(apiEndpoint, bodyProfileDTO, { headers: this.getHeaders() });
  }

  updateField(fieldName: string, updatedValue: any) {
    const apiEndpoint = `http://localhost:8222/account/user/${fieldName}`;
    return this.http.put(apiEndpoint, updatedValue, { headers: this.getHeaders() });
  }
}
