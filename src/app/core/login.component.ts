import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  message: string;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {
    if (this.authService.isLoggedIn)
      this.redirect();
  }

  redirect() {
      let url = this.authService.redirectUrl
                  ? this.authService.redirectUrl : '/home';
      this.router.navigate([url], {
        preserveQueryParams: true,
        preserveFragment: true
      });
  }

  login() {
    this.message = "...";
    this.authService.login().subscribe(() => {
      if (this.authService.isLoggedIn)
        this.redirect();
      else
        this.message = "Fail";
    });
  }
}
