import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterResponse {
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
export class RegisterService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/register';

  constructor(private http: HttpClient) {}

  register(formData: FormData): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.apiUrl, formData);
  }
} 