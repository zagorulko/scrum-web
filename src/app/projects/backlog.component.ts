import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs';

import { Project, Sprint, Task, ProjectService } from './project.service';

@Component({
  templateUrl: 'backlog.component.html'
})
export class BacklogComponent {
  loading: boolean = false;
  projectAlias: string = null;
  tasks: Task[] = [];
  assignedToMeOnly: boolean = false;
  currentSprintOnly: boolean = true;
  uncompletedOnly: boolean = false;
  orderBy: string = 'date';
  reverseOrder: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router,
              private projectService: ProjectService) {}

  ngOnInit() {
    this.loading = true;
    this.route.parent.params.subscribe(params => {
      this.projectAlias = params['id'];
      this.projectService
        .fetchProjectTasks(this.projectAlias)
        .map(tasks => this.tasks = tasks)
        .finally(() => this.loading = false)
        .subscribe();
    });
  }
}
