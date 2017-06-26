import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs';

import { Task, Comment, ProjectService } from './project.service';

@Component({
  templateUrl: 'task.component.html'
})
export class TaskComponent {
  loading: boolean = false;
  projectAlias: string;
  task: Task = null;
  comments: Comment[] = null;
  sending: boolean = false;
  message: string = '';

  constructor(private route: ActivatedRoute, private router: Router,
              private projectService: ProjectService) {}

  ngOnInit() {
    this.loading = true;
    this.route.parent.params.subscribe(params => {
      this.projectAlias = params['id'];
      this.route.params.subscribe(params => {
        let taskId = +params['taskId'];
        Observable.merge(
          this.projectService
            .fetchTask(taskId)
            .map(task => this.task = task),
          this.projectService
            .fetchTaskComments(taskId)
            .map(comments => this.comments = comments)
        )
        .finally(() => this.loading = false)
        .subscribe();
      })
    });
  }

  sendMessage() {
    if (this.sending)
      return;
    this.sending = true;
    Observable.merge(
      this.projectService
        .postTaskComment(this.task.id, this.message),
      this.projectService
        .fetchTaskComments(this.task.id)
        .map(comments => this.comments = comments)
    )
    .finally(() => this.sending = false)
    .subscribe(ok => this.message = '');
  }
}
