import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class GratitudeService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/gratitude';

  constructor(private http: HttpClient, private storageService: StorageService) {}

  async createGratitude(formData: FormData): Promise<any> {
    const token = await this.storageService.getToken();
    if (!token) {
      throw { success: false, message: 'توکن یافت نشد. لطفاً دوباره وارد شوید.' };
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    try {
      return await this.http.post(this.apiUrl, formData, { headers }).toPromise();
    } catch (error: any) {
      throw error.error || { success: false, message: 'خطا در ارسال اطلاعات.' };
    }
  }
} 