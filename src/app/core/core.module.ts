import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginComponent } from './login.component';
import { NavComponent } from './nav.component';
import { PageNotFoundComponent } from './not-found.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    NavComponent
  ],
  declarations: [
    LoginComponent,
    NavComponent,
    PageNotFoundComponent
  ],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class CoreModule { }
