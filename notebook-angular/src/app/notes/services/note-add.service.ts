// note-add.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../security-config/auth.service';
import { NoteAdd } from '../note-add/note-add.model';

@Injectable({
  providedIn: 'root'
})
export class NoteAddService {
  token = this.authService.getToken();

  constructor(private authService: AuthService, private http: HttpClient) { }

  createNote(newNote: NoteAdd) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post('http://localhost:8222/notes', newNote, { headers: headers });
  }
}
