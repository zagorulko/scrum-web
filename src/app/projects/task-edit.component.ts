import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ITdDynamicElementConfig, TdDynamicElement, TdDynamicFormsComponent,
         TdDynamicType } from '@covalent/dynamic-forms';
import { Observable } from 'rxjs';

import { Task, ProjectService } from './project.service';

@Component({
  templateUrl: 'task-edit.component.html'
})
export class TaskEditComponent {
  loading: boolean = false;
  projectAlias: string;
  task: Task = null;
  @ViewChild(TdDynamicFormsComponent) form: TdDynamicFormsComponent;
  formElements: ITdDynamicElementConfig[] = null;

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
          .map(task => {
            this.task = task;
            this.createForm();
          })
          .finally(() => this.loading = false)
          .subscribe();
      })
    });
  }

  createForm() {
    this.formElements = [
      {
        name: 'title',
        label: 'Title',
        type: TdDynamicElement.Input,
        required: true,
        default: this.task.title
      },
      {
        name: 'priority',
        label: 'Priority',
        type: TdDynamicType.Number,
        required: true,
        min: -2,
        max: 2,
        default: this.task.priority
      },
      {
        name: 'status',
        label: 'Status',
        type: TdDynamicElement.Select,
        required: true,
        default: this.task.status,
        selections: [
          'BACKLOG',
          'IN_PROCESS',
          'DONE'
        ]
      },
      {
        name: 'kind',
        label: 'Kind',
        type: TdDynamicElement.Select,
        default: this.task.kind,
        selections: [
          'BUG',
          'FEATURE'
        ]
      },
      {
        name: 'timeSpent',
        label: 'Time spent',
        type: TdDynamicType.Number,
        default: this.task.timeSpent
      },
      {
        name: 'effort',
        label: 'Effort',
        type: TdDynamicType.Number,
        default: this.task.effort
      },
      {
        name: 'acceptanceCriteria',
        label: 'Acceptance criteria',
        type: TdDynamicElement.Textarea,
        default: this.task.acceptanceCriteria
      },
      {
        name: 'userStory',
        label: 'User story',
        type: TdDynamicElement.Textarea,
        default: this.task.userStory
      },
    ];
  }

  save() {
    this.projectService
      .updateTask(this.task.id, {
        title: this.form.controls['title'].value,
        priority: this.form.controls['priority'].value,
        status: this.form.controls['status'].value,
        kind: this.form.controls['kind'].value,
        timeSpent: this.form.controls['timeSpent'].value,
        effort: this.form.controls['effort'].value,
        acceptanceCriteria: this.form.controls['acceptanceCriteria'].value,
        userStory: this.form.controls['userStory'].value
      })
      .subscribe(ok => {
        this.router.navigate(['/projects', this.projectAlias, 'backlog']);
      });
  }
}
