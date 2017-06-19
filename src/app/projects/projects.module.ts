import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { BacklogComponent } from './backlog.component';
import { MembersComponent } from './members.component';
import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './project-list.component';
import { ProjectService } from './project.service';
import { ProjectsRoutingModule } from './projects-routing.module';
import { SprintComponent } from './sprint.component';

@NgModule({
  imports: [
    SharedModule,
    ProjectsRoutingModule
  ],
  declarations: [
    BacklogComponent,
    MembersComponent,
    ProjectComponent,
    ProjectListComponent,
    SprintComponent
  ],
  providers: [
    ProjectService
  ]
})
export class ProjectsModule { }
