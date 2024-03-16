import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../security-config/auth.service';
import { Photo } from '../models/photo.model';
import { Body } from '../models/body-profil.model';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Limits } from '../models/limits.model';

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
// IMAGE
  loadPhoto(): Observable<Photo> {
    return this.http.get<Photo>('http://localhost:8222/body/photo', { headers: this.getHeaders() });
  }

  updateImage(updatedImageUrl: string): Observable<Photo> {
    return this.http.put<Photo>('http://localhost:8222/body/photo/put', { photoUrl: updatedImageUrl }, { headers: this.getHeaders() });
  }

  createImage(updatedImageUrl: string): Observable<Photo> {
    return this.http.post<Photo>('http://localhost:8222/body/photo/post', { photoUrl: updatedImageUrl }, { headers: this.getHeaders() });
  }

//USER
  loadUser(): Observable<User> {
    return this.http.get<User>('http://localhost:8222/account/user', { headers: this.getHeaders() });
  }
  
  updateField(fieldName: string, updatedValue: any) {
    const apiEndpoint = `http://localhost:8222/account/user/${fieldName}`;
    return this.http.put(apiEndpoint, updatedValue, { headers: this.getHeaders() });
  }
  
//BODY
  loadBodyProfil(): Observable<Body> {
    return this.http.get<Body>('http://localhost:8222/body/get', { headers: this.getHeaders() });
  }

  updateBodyProfile(fieldName: string, updatedValue: any) {
    const apiEndpoint = `http://localhost:8222/body/body/${fieldName}`;
    const bodyProfileDTO = {[fieldName]: updatedValue};
    return this.http.put(apiEndpoint, bodyProfileDTO, { headers: this.getHeaders() });
  }

  createBodyProfile(bodyProfile: Body) {
    const apiEndpoint = `http://localhost:8222/body/post`;
    return this.http.post(apiEndpoint, bodyProfile, { headers: this.getHeaders() });
}

//LIMITS
  loadLimitsProfile(): Observable<Limits> {
    return this.http.get<Limits>('http://localhost:8222/body/limits', { headers: this.getHeaders() });
  }

  updateLimitsProfile(fieldName: string, updatedValue: any): Observable<Limits> {
    console.log(fieldName,updatedValue,"hej")
    const apiEndpoint = `http://localhost:8222/limits/${fieldName}`;
    const limitsProfileDTO = {[fieldName]: updatedValue};
    return this.http.put<Limits>(apiEndpoint, limitsProfileDTO, { headers: this.getHeaders() });
}

  createLimits(limitsProfile: Limits): Observable<Limits> {
    return this.http.post<Limits>('http://localhost:8222/body/limits/post', limitsProfile, { headers: this.getHeaders() });
  }
}
