import { Component, Input } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-basic-layout',
  templateUrl: 'basic-layout.component.html'
})
export class BasicLayoutComponent {
  @Input() toolbarTitle: string = '';

  constructor(public authService: AuthService) {}
}
