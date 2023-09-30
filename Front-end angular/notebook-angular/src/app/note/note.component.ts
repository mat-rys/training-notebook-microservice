import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  logoPath = "assets\\Training Notebook-logos_transparent.png";
  notes: any[] = []; // Tutaj przechowujesz dane notatek

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes() {
    this.http.get<any[]>('http://localhost:8222/notes')
      .subscribe(data => {
        this.notes = data;
      });
  }
}
