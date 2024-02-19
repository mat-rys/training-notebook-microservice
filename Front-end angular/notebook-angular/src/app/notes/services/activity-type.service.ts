// activity-type.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityTypeService {

  constructor(private http: HttpClient) { }

  getActivityTypes(): Observable<any[]> {
    return this.http.get<any[]>('assets/activities.json');
  }
}
