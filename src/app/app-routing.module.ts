import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login.component';
import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'projects',
    loadChildren: 'app/projects/projects.module#ProjectsModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: 'app/settings/settings.module#SettingsModule',
    canLoad: [AuthGuard]
  },
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [],
  providers: []
})
export class AppRoutingModule { }
