import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { BacklogComponent } from './backlog.component';
import { MembersComponent } from './members.component';
import { NewTaskDialogComponent } from './new-task-dialog.component';
import { PriorityOutputComponent } from './priority-output.component';
import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './project-list.component';
import { ProjectService } from './project.service';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ReportComponent } from './report.component';
import { TaskComponent } from './task.component';
import { TaskEditComponent } from './task-edit.component';

@NgModule({
  imports: [
    SharedModule,
    ProjectsRoutingModule
  ],
  declarations: [
    BacklogComponent,
    MembersComponent,
    NewTaskDialogComponent,
    PriorityOutputComponent,
    ProjectComponent,
    ProjectListComponent,
    ReportComponent,
    TaskComponent,
    TaskEditComponent
  ],
  providers: [
    ProjectService
  ],
  entryComponents: [
    NewTaskDialogComponent
  ]
})
export class ProjectsModule { }
