import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs';

import { Task, ProjectService } from './project.service';

@Component({
  templateUrl: 'task-edit.component.html'
})
export class TaskEditComponent {
  loading: boolean = false;
  projectAlias: string;
  task: Task = null;

  constructor(private route: ActivatedRoute, private router: Router,
              private projectService: ProjectService) {}

  ngOnInit() {
    this.loading = true;
    this.route.parent.params.subscribe(params => {
      this.projectAlias = params['id'];
      this.route.params.subscribe(params => {
        let taskId = +params['taskId'];
        this.projectService
          .fetchTask(taskId)
          .map(task => this.task = task)
          .finally(() => this.loading = false)
          .subscribe();
      })
    });
  }
}
