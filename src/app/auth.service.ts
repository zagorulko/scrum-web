import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';

export class Profile {
  username: string;
  fullName: string;
  email: string;
}

@Injectable()
export class AuthService {
  profile: Profile = null;
  redirectUrl: string;

  constructor(private http: Http, private router: Router,
              private apiService: ApiService) {
    this.apiService.accessToken = localStorage.getItem('accessToken');
  }

  get isLoggedIn(): boolean {
    return !!this.profile;
  }

  get maybeLoggedIn(): boolean {
    return !!this.apiService.accessToken;
  }

  fetchProfile(): Observable<Profile> {
    if (this.profile)
      return Observable.from([this.profile]);
    return this.apiService
      .get('/profile', {})
      .map(response => this.profile = response.json());
  }

  login(username: string, password: string): Observable<Profile> {
    return this.apiService
      .post('/login', {username, password})
      .map(response => {
        let accessToken = response.json()['access_token'];
        localStorage.setItem('accessToken', accessToken);
        this.apiService.accessToken = accessToken;
      })
      .flatMap(x => this.fetchProfile());
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    this.apiService.accessToken = null;
    this.profile = null;
    this.router.navigate(['/login']);
  }
}
