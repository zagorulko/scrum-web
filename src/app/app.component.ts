import { Component } from '@angular/core';

import { TdMediaService } from '@covalent/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(public media: TdMediaService,
              public authService: AuthService) {}
}
