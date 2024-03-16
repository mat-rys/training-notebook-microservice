import { Component, Output,Input, EventEmitter } from '@angular/core';
import { Body } from '../models/body-profil.model';
import { Limits } from '../models/limits.model';

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
  showCaloriesInput = false;
  showCarbsInput = false;
  showFatsInput = false;
  showProteinsInput = false;

  newWeight: number = 0; 
  newHeight: number = 0;
  newGender= '';
  newAge: number = 0;
  newGoals='';
  newCalories: number = 0;
  newCarbs: number = 0;
  newFats: number = 0;
  newProteins: number = 0;
  
  @Input() loadedBodyProfile!: Body;
  @Input() loadedLimitsProfile!: Limits;
  @Output() profileUpdate: EventEmitter<{ fieldName: string, updatedValue: any }> = new EventEmitter();
  @Output() limitUpdate: EventEmitter<{ fieldName: string, updatedValue: any }> = new EventEmitter();

  onProfileUpdate(fieldName: string, updatedValue: any) {
    this.profileUpdate.emit({ fieldName: fieldName, updatedValue: updatedValue });
    this.toggleInput(fieldName);
  }

  updateLimitsProfile(fieldName: string, updatedValue: any) {
    this.limitUpdate.emit({ fieldName: fieldName, updatedValue: updatedValue });
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
      case 'limitCalories':
        this.showCaloriesInput = !this.showCaloriesInput;
        break;
      case 'limitCarbs':
        this.showCarbsInput = !this.showCarbsInput;
        break;
      case 'limitFats':
        this.showFatsInput = !this.showFatsInput;
        break;
      case 'limitProteins':
        this.showProteinsInput = !this.showProteinsInput;
        break;
      default:
        break;
    }
  }

  // onLimitsUpdate(fieldName: string, updatedValue: any) {
  //   this.accountService.updateLimitsProfile(fieldName, updatedValue).subscribe(() => {
  //     this.loadLimitsProfile();
  //   });
  //   this.toggleInput(fieldName);
  // }
}