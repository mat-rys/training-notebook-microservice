import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/security-config/auth.service';
import { AccountMeasurementService } from '../services/account-measurement.service';
import { BodyMeasurement } from './models/body-measurements.model';

@Component({
  selector: 'app-profile-measurements',
  templateUrl: './profile-measurements.component.html',
  styleUrls: ['./profile-measurements.component.css']
})
export class ProfileMeasurementsComponent implements OnInit {
  measurements: BodyMeasurement[] = [];
  selectedMeasurement: BodyMeasurement | null = null;

  newMeasurement: BodyMeasurement = {
    waistCircumference: 0,
    bicepCircumference: 0,
    chestCircumference: 0,
    thighCircumference: 0,
    hipCircumference: 0,
    forearmCircumference: 0,
    calfCircumference: 0,
    neckCircumference: 0,
    wristCircumference: 0,
    shoulderCircumference: 0,
    dateMeasured: new Date().toISOString(),
  };

  constructor(private authService: AuthService, private accountMeasurementService: AccountMeasurementService) { }

  ngOnInit(): void {
    this.loadMeasurements();
  }

  loadMeasurements() {
    this.accountMeasurementService.getMeasurements().subscribe(data => {
      this.measurements = data.sort((a, b) => new Date(b.dateMeasured).getTime() - new Date(a.dateMeasured).getTime());
    });
  }
  

  selectMeasurement(measurement: BodyMeasurement) {
    this.selectedMeasurement = measurement;
    this.newMeasurement = { ...measurement };
  }

  clearSelection() {
    this.selectedMeasurement = null;
    this.resetNewMeasurement();
  }

  addMeasurement() {
    this.accountMeasurementService.addMeasurement(this.newMeasurement).subscribe(() => {
      this.loadMeasurements();
      this.resetNewMeasurement();
    });
  }

  updateMeasurement() {
    if (this.selectedMeasurement) {
      this.accountMeasurementService.updateMeasurement(this.newMeasurement).subscribe(() => {
        this.loadMeasurements();
        this.clearSelection();
      });
    }
  }

  deleteMeasurement(id: number) {
    this.accountMeasurementService.deleteMeasurement(id).subscribe(() => {
      this.loadMeasurements();
      this.clearSelection();
    });
  }

  private resetNewMeasurement() {
    this.newMeasurement = {
      waistCircumference: 0,
      bicepCircumference: 0,
      chestCircumference: 0,
      thighCircumference: 0,
      hipCircumference: 0,
      forearmCircumference: 0,
      calfCircumference: 0,
      neckCircumference: 0,
      wristCircumference: 0,
      shoulderCircumference: 0,
      dateMeasured: new Date().toISOString(),
    };
  }

  
  handleLogout() {
    this.authService.removeToken();
  }
}
