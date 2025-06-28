import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  sendReport(gratitudeId: number, text: string, type: string): Observable<any> {
    return from(this.storage.getToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        return this.http.post<any>(
          `http://127.0.0.1:8000/api/v1/gratitude/${gratitudeId}/report`,
          { text, type },
          { headers }
        );
      })
    );
  }
} 