import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    name: string;
    username: string;
    email: string;
    avatar: string | null;
    updated_at: string;
    created_at: string;
    id: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/login';

  constructor(private http: HttpClient) {}

  login(formData: FormData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, formData);
  }
} 