import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../security-config/auth.service';
import { AccountService } from '../account/services/account-data.service';
import { Photo } from './models/photo.model';
import { Body } from './models/body-profil.model';
import { User } from './models/user.model';
import { Limits } from './models/limits.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [AuthService]
})
export class AccountComponent implements OnInit {
  user!: User; 
  body!: Body;
  photo!: Photo;
  limits!: Limits;

  constructor(private accountService: AccountService) { }

   ngOnInit(): void {
    this.loadUserProfile();
    this.loadBodyProfil();
    this.loadPhoto(); 
    this.loadLimitsProfile();
  }

  loadPhoto() {
    this.accountService.loadPhoto().subscribe(
      data => {this.photo = data;},
      error => {if (error.status === 404) {this.createImage('');}}
    );
  }

  loadUserProfile() {
    this.accountService.loadUser().subscribe(data => {
      this.user = data;
    });
  }

  loadBodyProfil() {
    this.accountService.loadBodyProfil().subscribe(
      data => {this.body = data;},
      error => {
        if (error.status === 404) {
          const emptyBodyProfile: Body = {
            weight: 0,
            height: 0,
            gender: '',
            age: 0,
            goals: ''
          };
          this.createBodyProfile(emptyBodyProfile);
        }
      }
    );
  }
  
createBodyProfile(bodyProfile: Body) {
  this.accountService.createBodyProfile(bodyProfile).subscribe(() => {
    this.loadBodyProfil();
  });
}

updateImage(updatedImageUrl: string) {
  this.accountService.updateImage(updatedImageUrl).subscribe(() => {
    this.loadPhoto();
  });
  }

  createImage(updatedImageUrl: string) {
    this.accountService.createImage(updatedImageUrl).subscribe(() => {
      this.loadPhoto();
    });
    }

  updateBodyProfile(fieldName: string, updatedValue: any) {
    this.accountService.updateBodyProfile(fieldName, updatedValue).subscribe(() => {
      this.loadBodyProfil();
    });
  }

  updateUserProfile(fieldName: string, updatedValue: any) {
    this.accountService.updateField(fieldName, updatedValue).subscribe(() => {
      this.loadUserProfile();
    });
  }

  loadLimitsProfile() {
    this.accountService.loadLimitsProfile().subscribe(
      data => {this.limits = data;},
      error => {
        if (error.status === 404) {
          const emptyLimitsProfile: Limits = {
            limitCalories: 0,
            limitCarbs: 0,
            limitFats: 0,
            limitProteins: 0
          };
          this.createLimitsProfile(emptyLimitsProfile);
        }
      }
    );
  }
  
  createLimitsProfile(limitsProfile: Limits) {
    this.accountService.createLimits(limitsProfile).subscribe(() => {
      this.loadLimitsProfile();
    });
  }
  
  updateLimitsProfile(fieldName: string, updatedValue: any) {
    console.log(fieldName,updatedValue)
    this.accountService.updateLimitsProfile(fieldName, updatedValue).subscribe(() => {
      this.loadLimitsProfile();
    });
}

  


}
