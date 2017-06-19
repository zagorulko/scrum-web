import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth.guard';

import { BacklogComponent } from './backlog.component';
import { MembersComponent } from './members.component';
import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './project-list.component';
import { SprintComponent } from './sprint.component';

const projectsRoutes: Routes = [
  { path: '', component: ProjectListComponent, canActivate: [AuthGuard] },
  { path: ':id', component: ProjectComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'backlog', pathMatch: 'full' },
      { path: 'backlog', component: BacklogComponent },
      { path: 'members', component: MembersComponent },
      { path: 'sprints/:sprintId', component: SprintComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(projectsRoutes)
  ]
})
export class ProjectsRoutingModule { }
