import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../security-config/auth.service';
import { environment } from '../../../environments/environment'; // Dodaj ten import

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {
  private adminTokenUrl = environment.adminTokenUrl; 
  private registerUrl = environment.registerUrl; 

  constructor(private http: HttpClient) { }

  getAdminToken() {
    const body = new URLSearchParams();
    body.set('username', environment.adminUsername);
    body.set('password', environment.adminPassword); 
    body.set('grant_type', 'password');
    body.set('client_id', environment.clientId); 

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(this.adminTokenUrl, body.toString(), { headers });
  }

  registerUser(user: any, accessToken: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
    
    return this.http.post(this.registerUrl, user, { headers });
  }
}
