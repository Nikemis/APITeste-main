import { Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders().set("id-token", token);

    return this.http.get<User[]>(this.apiUrl, { headers });
  }

  createUser(user: User): Observable<User> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders().set("id-token", token);

    return this.http.post<User>(this.apiUrl, user, { headers });
  }

  updateUser(id: string, user: User): Observable<User> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders().set("id-token", token);

    return this.http.put<User>(`${this.apiUrl}/${id}`, user, { headers });
  }

  deleteUser(id: string): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders().set("id-token", token);

    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}