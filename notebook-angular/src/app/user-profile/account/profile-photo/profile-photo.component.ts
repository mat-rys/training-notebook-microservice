import { Component, Output,Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.css']
})
export class ProfilePhotoComponent {
  showImageInput = false; 
  newImageUrl = ''; 

  @Input() loadedImage!: string;
  @Output() updateImage = new EventEmitter<string>();

  onUpdateImage() {
    this.updateImage.emit(this.newImageUrl);
  }

  toggleInput(){
    this.showImageInput = !this.showImageInput
    console.log(this.showImageInput)
  }

}
