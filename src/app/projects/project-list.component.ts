import { Component } from '@angular/core';

import { Project, ProjectService } from './project.service';

@Component({
  templateUrl: 'project-list.component.html'
})
export class ProjectListComponent {
  loading: boolean = false;
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.loading = true;
    this.projectService
      .fetchProjectList()
      .finally(() => this.loading = false)
      .subscribe(
        projects => this.projects = projects,
        error => {
          // TODO
        }
      );
  }
}
