import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  put<T>(path: string, body: any, headers?: any) {
    return this.http.put<T>(path, body, { headers });
  }

  get<T>(path: string, headers?: any) {
    return this.http.get<T>(path, { headers });
  }

  post<T>(path: string, body: any) {
    return this.http.post<T>(path, body);
  }

  delete<T>(path: string) {
    return this.http.delete<T>(path);
  }
}
