import { Component, Output,Input, EventEmitter } from '@angular/core';
import { Body } from '../models/body-profil.model';

@Component({
  selector: 'app-profile-body',
  templateUrl: './profile-body.component.html',
  styleUrls: ['./profile-body.component.css']
})
export class ProfileBodyComponent {
  showWeightInput = false;
  showHeightInput = false;
  showGenderInput = false;
  showAgeInput = false;
  showGoalsInput = false;

  newWeight: number = 0; 
  newHeight: number = 0;
  newGender= '';
  newAge: number = 0;
  newGoals='';
  
  @Input() loadedBodyProfile!: Body;
  @Output() profileUpdate: EventEmitter<{ fieldName: string, updatedValue: any }> = new EventEmitter();

  onProfileUpdate(fieldName: string, updatedValue: any) {
    this.profileUpdate.emit({ fieldName: fieldName, updatedValue: updatedValue });
    this.toggleInput(fieldName);
  }

  toggleInput(fieldName: string) {
    switch(fieldName) {
      case 'weight':
        this.showWeightInput = !this.showWeightInput;
        break;
      case 'height':
        this.showHeightInput = !this.showHeightInput;
        break;
      case 'gender':
        this.showGenderInput = !this.showGenderInput;
        break;
      case 'age':
        this.showAgeInput = !this.showAgeInput;
        break;
      case 'goals':
        this.showGoalsInput = !this.showGoalsInput;
        break;  
      default:
        break;
    }
  }
}
