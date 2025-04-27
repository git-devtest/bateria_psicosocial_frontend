import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(data: { email: string; contrasena: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, data);
  }
}
