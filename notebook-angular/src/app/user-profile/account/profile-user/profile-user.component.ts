import { Component, Output,Input, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent {
  newEmail= '';
  newFirstName = '';
  newLastName = '';
  newUsername = '';
  
  showEmailInput = false;
  showFirstNameInput = false;
  showLastNameInput = false;
  showUsernameInput = false;

  @Input() loadedUserProfile!: User;
  @Output() profileUpdate: EventEmitter<{ fieldName: string, updatedValue: any }> = new EventEmitter();

  onProfileUpdate(fieldName: string, updatedValue: any) {
    this.profileUpdate.emit({ fieldName: fieldName, updatedValue: updatedValue });
    this.toggleInput(fieldName);
  }
  
  toggleInput(fieldName: string) {
    switch(fieldName) {
      case 'email':
        this.showEmailInput = !this.showEmailInput;
        break;
      case 'firstName':
        this.showFirstNameInput = !this.showFirstNameInput;
        break;
      case 'lastName':
        this.showLastNameInput = !this.showLastNameInput;
        break;
      case 'username':
        this.showUsernameInput = !this.showUsernameInput;
        break;
      default:
        break;
    }
  }
}
