// src/app/services/note-statistics.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../security-config/auth.service';
import { Observable } from 'rxjs';
import { ActivityTypeCountDTO } from '../notes-statistics/models/activity-type-count.dto';
import { ActivityCountByWeekday } from '../notes-statistics/models/activity-count-by-weekday.model';
import { DailyNoteCountDTO } from '../notes-statistics/models/daily-note-count.dto';

@Injectable({
  providedIn: 'root'
})
export class NoteStatisticsService {
  private token = this.authService.getToken();
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });

  constructor(private authService: AuthService, private http: HttpClient) { }

  getActivityStatistics(fromDate: Date, toDate: Date): Observable<ActivityTypeCountDTO[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    const fromDateUTC = fromDate.toISOString().split('T')[0];
    const toDateUTC = toDate.toISOString().split('T')[0];

    return this.http.get<ActivityTypeCountDTO[]>(
      `http://localhost:8222/notes/statistics/activity-count?fromDate=${fromDateUTC}&toDate=${toDateUTC}`,
      { headers }
    );
  }

  getActivityCountsByWeekday(fromDate: Date, toDate: Date): Observable<ActivityCountByWeekday[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    const fromDateUTC = fromDate.toISOString().split('T')[0];
    const toDateUTC = toDate.toISOString().split('T')[0];

    return this.http.get<ActivityCountByWeekday[]>(
      `http://localhost:8222/notes/statistics/activity-count-by-weekday?fromDate=${fromDateUTC}&toDate=${toDateUTC}`,
      { headers }
    );
  }

  getDailyNoteCounts(fromDate: Date, toDate: Date): Observable<DailyNoteCountDTO[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    const fromDateUTC = fromDate.toISOString().split('T')[0];
    const toDateUTC = toDate.toISOString().split('T')[0];

    return this.http.get<DailyNoteCountDTO[]>(`http://localhost:8222/notes/statistics/daily-counts?fromDate=${fromDateUTC}&toDate=${toDateUTC}`, { headers });
  }
}
