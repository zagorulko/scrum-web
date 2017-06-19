import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username: string;
  password: string;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {
    if (this.authService.isLoggedIn)
      this.redirect();
  }

  redirect() {
    let url = this.authService.redirectUrl
                ? this.authService.redirectUrl
                : '/projects';
    this.router.navigate([url], {
      preserveQueryParams: true,
      preserveFragment: true
    });
  }

  login() {
    this.loading = true;
    this.authService
      .login(this.username, this.password)
      .finally(() => this.loading = false)
      .subscribe(
        user => this.redirect(),
        error => this.errorMessage = error
      );
  }
}
