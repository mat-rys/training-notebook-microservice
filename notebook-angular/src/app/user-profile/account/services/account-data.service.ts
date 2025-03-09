import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../security-config/auth.service';
import { Photo } from '../models/photo.model';
import { Body } from '../models/body-profil.model';
import { User } from '../models/user.model';
import { catchError, Observable, of } from 'rxjs';

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
  
  updateField(fieldName: string, updatedValue: any): Observable<any> {
    const apiEndpoint = `http://localhost:8222/account/user/${fieldName}`;
    return this.http.put<any>(apiEndpoint, updatedValue, { headers: this.getHeaders() })
  }
  
//BODY
  loadBodyProfil(): Observable<Body> {
    return this.http.get<Body>('http://localhost:8222/body/get', { headers: this.getHeaders() });
  }

  updateBodyProfile(fieldName: string, updatedValue: any): Observable<string> {
    const apiEndpoint = `http://localhost:8222/account/user/${fieldName}`;
    const bodyProfileDTO = { [fieldName]: updatedValue };
    
    // Ustaw responseType na 'text', żeby odpowiedź była traktowana jako tekst, nie jako JSON
    return this.http.put(apiEndpoint, bodyProfileDTO, { 
      headers: this.getHeaders(),
      responseType: 'text'  // Odpowiedź traktowana jako tekst
    });
  }
  
  
  

  createBodyProfile(bodyProfile: Body): Observable<any> {
    const apiEndpoint = `http://localhost:8222/body/post`;
    return this.http.post<any>(apiEndpoint, bodyProfile, { headers: this.getHeaders() })
  }

  //AI OPINIA
  generateAiBodyInformationOpinion(): Observable<any> {
    const url = `http://localhost:8222/body/ai/generate/bodyInformation`;
    return this.http.get(url, { headers: this.getHeaders() });
  }
}
