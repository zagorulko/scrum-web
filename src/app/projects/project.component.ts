import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs';

import { Project, Sprint, Task, ProjectService } from './project.service';

@Component({
  templateUrl: 'project.component.html'
})
export class ProjectComponent {
  loading: boolean = false;
  project: Project = null;
  sprints: Sprint[] = [];

  constructor(private location: Location,
              private route: ActivatedRoute, private router: Router,
              private projectService: ProjectService) {}

  ngOnInit() {
    this.refresh();
  }

  goBack() {
    this.location.back();
    // this.router.navigate(['/projects']);
  }

  refresh() {
    this.loading = true;
    this.route.params.subscribe(params => {
      let projectAlias = params['id'];
      Observable.merge(
        this.projectService
          .fetchProject(projectAlias)
          .map(project => this.project = project),
        this.projectService
          .fetchProjectSprints(projectAlias)
          .map(sprints => this.sprints = sprints)
      )
      .finally(() => this.loading = false)
      .subscribe();
    });
  }
}
