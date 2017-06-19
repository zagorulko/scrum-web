import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './project-list.component';
import { ProjectService } from './project.service';
import { ProjectsRoutingModule } from './projects-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ProjectsRoutingModule
  ],
  declarations: [
    ProjectComponent,
    ProjectListComponent
  ],
  providers: [
    ProjectService
  ]
})
export class ProjectsModule { }
