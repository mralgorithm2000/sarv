import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/gratitudes';

  constructor(private http: HttpClient, private storageService: StorageService) {}

  async getPosts(page: number): Promise<{data: any[], next_page_url: string | null}> {
    const token = await this.storageService.getToken();
    if (!token) {
      const error: any = new Error('Unauthorized');
      error.status = 401;
      throw error;
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    try {
      const res: any = await this.http.get(`${this.apiUrl}?page=${page}`, { headers }).toPromise();
      return {
        data: res?.content?.data || [],
        next_page_url: res?.content?.next_page_url || null
      };
    } catch (error: any) {
      if (error.status === 401 || error.status === 403) {
        throw error;
      }
      throw error;
    }
  }
} 