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
  WactivityType= '';
  activityTypes: any[] = [];
  notesPath = "assets\\flat-lay-pink-sports-attributes-with-clipboard.jpg";
  successMessage: string = '';
  

  constructor(private authService: AuthService, private noteAddService: NoteAddService,
    private router: Router, private activityTypeService: ActivityTypeService) { }

    ngOnInit(): void {
      this.activityTypeService.getActivityTypes().subscribe(types => {
        this.activityTypes = types.map(activity => activity.activity_type); 
      });
      document.body.style.backgroundImage = `url(${this.notesPath})`;
    } 
    
    selectActivityType(activity: string) {
      this.WactivityType = activity;
    }
    
    handleCreateNoteEvent(noteData: any) {
    this.noteAddService.createNote(noteData).subscribe(
      (response) => {
        console.log('Notatka została utworzona.');
        this.successMessage = 'Note created successfully!';
        setTimeout(() => { this.router.navigate(['/notes']); }, 1000);
      },
      (error) => {console.error('Wystąpił błąd podczas tworzenia notatki.', error);}
    );
  }
  
  handleLogout() {
    this.authService.removeToken();
  }

}
