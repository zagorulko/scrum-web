import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';

export class User {
  username: string;
  fullName: string;
  email: string;
}

@Injectable()
export class AuthService {
  user: User = null;
  redirectUrl: string;

  constructor(private http: Http, private router: Router,
              private apiService: ApiService) {
    this.apiService.accessToken = localStorage.getItem('accessToken');
  }

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  get maybeLoggedIn(): boolean {
    return !!this.apiService.accessToken;
  }

  fetchUser(): Observable<User> {
    if (this.user)
      return Observable.from([this.user]);
    return this.apiService
      .get('/user', {})
      .map(response => this.user = response.json());
  }

  login(username: string, password: string): Observable<User> {
    return this.apiService
      .post('/login', {username, password})
      .map(response => {
        let accessToken = response.json()['access_token'];
        localStorage.setItem('accessToken', accessToken);
        this.apiService.accessToken = accessToken;
      })
      .flatMap(x => this.fetchUser());
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    this.apiService.accessToken = null;
    this.user = null;
    this.router.navigate(['/login']);
  }
}
