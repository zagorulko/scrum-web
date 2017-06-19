import { Component, Input } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-card-layout',
  templateUrl: 'card-layout.component.html'
})
export class CardLayoutComponent {
  @Input() toolbarTitle: string = '';
  @Input() cardTitle: string = '';
  @Input() cardSubtitle: string = '';

  constructor(public authService: AuthService) {}
}
