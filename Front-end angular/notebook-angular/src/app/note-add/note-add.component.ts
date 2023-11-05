import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms'; // Dodaj import formularza
import { NoteAdd } from './note-add.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.css']
})
export class NoteAddComponent implements OnInit {

  Wtitle= '';
  WactivityType= '';
  WstartDate= new Date(); 
  WendDate= new Date();   
  Wdescription= '';

  logoPath = "assets\\Training Notebook-logos.png";
  notesPath = "assets\\flat-lay-pink-sports-attributes-with-clipboard.jpg";
  token = this.authService.getToken();

  constructor(private authService: AuthService,private http: HttpClient) { }
  ngOnInit(): void {}

  createNote() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    

    const newNote: NoteAdd = {
      title: this.Wtitle,
      activityType: this.WactivityType,
      startDate: this.WstartDate,
      endDate: this.WendDate,
      description: this.Wdescription
    };
  
    this.http.post('http://localhost:8222/notes', newNote, { headers: headers })
      .subscribe(
        (response) => {
          console.log('Notatka została utworzona.');
        },
        (error) => {
          console.error('Wystąpił błąd podczas tworzenia notatki.', error);
        }
      );
  }

  logout() {
    this.authService.removeToken();
  }
  
}
