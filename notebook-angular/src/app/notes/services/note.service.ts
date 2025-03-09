// note.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../security-config/auth.service';
import { Note } from '../notes-list/note.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  token = this.authService.getToken();

  constructor(private authService: AuthService, private http: HttpClient) { }

  getNotes(selectedDate: Date) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const selectedDateUTC = selectedDate.toISOString().split('T')[0];
    return this.http.get<any[]>(`http://localhost:8222/notes/byUserIdAndStartDate?startDate=${selectedDateUTC}`, { headers });
  }

  deleteNote(noteId: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete(`http://localhost:8222/notes/${noteId}`, { headers });
  }

  updateNote(editingNote: Note) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put(`http://localhost:8222/notes/${editingNote.id}`, editingNote, { headers });
  }

  getDaysForMonth(): Observable<string[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<string[]>(`http://localhost:8222/notes/datepicker-dates`, { headers });
  } 
}
