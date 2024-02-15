import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../security-config/auth.service';
import { Router } from '@angular/router';
import { NoteAdd } from './note-add.model';

@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.css']
})
export class NoteAddComponent implements OnInit {

  Wtitle= '';
  WactivityType= '';
  WstartDate: string = ''; // Zmieniamy na string
  WendDate: string = '';   // Zmieniamy na string
  Wdescription= '';

  logoPath = "assets\\Training Notebook-logos.png";
  notesPath = "assets\\flat-lay-pink-sports-attributes-with-clipboard.jpg";
  token = this.authService.getToken();
  successMessage: string = '';

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }
  ngOnInit(): void {}

  createNote() {
    if (!this.Wtitle) {
      alert('Please enter a title for the note.');
      return;
    }
  
    // Ustalamy aktualną datę, jeśli nie podano daty
    const currentDate = new Date();
    const startDate = this.WstartDate ? new Date(this.WstartDate) : currentDate;
    const endDate = this.WendDate ? new Date(this.WendDate) : currentDate;
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  
    const newNote: NoteAdd = {
      title: this.Wtitle,
      activityType: this.WactivityType,
      startDate: startDate,
      endDate: endDate,
      description: this.Wdescription
    };
  
    this.http.post('http://localhost:8222/notes', newNote, { headers: headers })
      .subscribe(
        (response) => {
          console.log('Notatka została utworzona.');
          this.successMessage = 'Note created successfully!';
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/notes']);
          }, 1000);
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
