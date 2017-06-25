import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth.guard';

import { BacklogComponent } from './backlog.component';
import { MembersComponent } from './members.component';
import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './project-list.component';
import { ReportComponent } from './report.component';
import { TaskComponent } from './task.component';
import { TaskEditComponent } from './task-edit.component';

const projectsRoutes: Routes = [
  { path: '', component: ProjectListComponent, canActivate: [AuthGuard] },
  { path: ':id', component: ProjectComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'backlog', pathMatch: 'full' },
      { path: 'backlog', component: BacklogComponent, pathMatch: 'full' },
      { path: 'backlog/:taskId', component: TaskComponent, pathMatch: 'full' },
      { path: 'backlog/:taskId/edit', component: TaskEditComponent },
      { path: 'members', component: MembersComponent },
      { path: 'reports/:sprintId', component: ReportComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(projectsRoutes)
  ]
})
export class ProjectsRoutingModule { }
