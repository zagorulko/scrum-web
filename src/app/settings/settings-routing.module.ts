import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth.guard';

import { SettingsComponent } from './settings.component';

const settingsRoutes: Routes = [
  { path: '', component: SettingsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(settingsRoutes)
  ]
})
export class SettingsRoutingModule { }
