import { Component, Input } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html'
})
export class MenuComponent {
  constructor(public authService: AuthService) {}
}
