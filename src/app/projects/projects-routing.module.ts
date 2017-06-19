import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth.guard';

import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './project-list.component';

const projectsRoutes: Routes = [
  { path: '', component: ProjectListComponent, canActivate: [AuthGuard] },
  { path: ':id', component: ProjectComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(projectsRoutes)
  ]
})
export class ProjectsRoutingModule { }
