import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  put<T>(path: string, body: any) {
    return this.http.put<T>(path, body);
  }
}
