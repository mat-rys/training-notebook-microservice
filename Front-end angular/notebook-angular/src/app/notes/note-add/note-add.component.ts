// note-add.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../security-config/auth.service';
import { Router } from '@angular/router';
import { NoteAdd } from './note-add.model';
import { NoteAddService } from '../services/note-add.service';
import { ActivityTypeService } from '../services/activity-type.service';

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
  successMessage: string = '';
  activityTypes: any[] = [];

  constructor(private authService: AuthService, private noteAddService: NoteAddService,
    private router: Router, private activityTypeService: ActivityTypeService) { }

    ngOnInit(): void {
      this.activityTypeService.getActivityTypes().subscribe(types => {
        this.activityTypes = types.map(activity => activity.activity_type); // Przekształć obiekty typu aktywności na tablicę samych nazw
      });
    } 
    
    selectActivityType(activity: string) {
      this.WactivityType = activity;
    }
    

  createNote() {
    if (!this.Wtitle) {
      alert('Please enter a title for the note.');
      return;
    }
  
    // Ustalamy aktualną datę, jeśli nie podano daty
    const currentDate = new Date();
    const startDate = this.WstartDate ? new Date(this.WstartDate) : currentDate;
    const endDate = this.WendDate ? new Date(this.WendDate) : currentDate;
  
    const newNote: NoteAdd = {
      title: this.Wtitle,
      activityType: this.WactivityType,
      startDate: startDate,
      endDate: endDate,
      description: this.Wdescription
    };
  
    this.noteAddService.createNote(newNote).subscribe(
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
