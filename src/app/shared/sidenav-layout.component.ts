import { Component, Input } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sidenav-layout',
  templateUrl: 'sidenav-layout.component.html'
})
export class SidenavLayoutComponent {
  @Input() toolbarTitle: string = '';
  @Input() toolbarSubtitle: string = '';

  constructor(public authService: AuthService) {}
}
