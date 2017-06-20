import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs';

import { Sprint, Task, ProjectService } from './project.service';

@Component({
  templateUrl: 'sprint.component.html'
})
export class SprintComponent {
  loading: boolean = false;
  projectAlias: string = null;
  sprint: Sprint = null;
  sprintTasks: Task[] = null;

  constructor(private route: ActivatedRoute, private router: Router,
              private projectService: ProjectService) {}

  ngOnInit() {
    this.loading = true;
    this.route.parent.params.subscribe(params => {
      this.projectAlias = params['id'];
      this.route.params.subscribe(params => {
        let sprintId = +params['sprintId'];
        Observable.merge(
          this.projectService
            .fetchSprint(sprintId)
            .map(sprint => this.sprint = sprint),
          this.projectService
            .fetchSprintTasks(sprintId)
            .map(tasks => this.sprintTasks = tasks)
        )
        .finally(() => this.loading = false)
        .subscribe();
      })
    });
  }
}
