import { Component } from '@angular/core';

import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: 'settings.component.html'
})
export class SettingsComponent {
  username: string;
  fullName: string;
  email: string;
  errorMessage: string = '';

  constructor(private apiService: ApiService,
              private authService: AuthService) {}

  ngOnInit() {
    this.username = this.authService.profile.username;
    this.fullName = this.authService.profile.fullName;
    this.email = this.authService.profile.email;
  }

  save() {
    this.apiService
      .post('/profile', {
        username: this.username,
        fullName: this.fullName,
        email: this.email
      })
      .subscribe(
        ok => this.authService
                .fetchProfile()
                .subscribe(profile => window.location.reload()),
        error => this.errorMessage = error
      );
  }
}
