import { Component, Inject, ViewChild } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

import { ITdDynamicElementConfig, TdDynamicElement, TdDynamicFormsComponent,
         TdDynamicType } from '@covalent/dynamic-forms';
import { Observable } from 'rxjs';

import { Task, ProjectService } from './project.service';

@Component({
  templateUrl: 'new-task-dialog.component.html'
})
export class NewTaskDialogComponent {
  @ViewChild(TdDynamicFormsComponent) form: TdDynamicFormsComponent;
  formElements: ITdDynamicElementConfig[] = [
    {
      name: 'title',
      label: 'Title',
      type: TdDynamicElement.Input,
      required: true
    },
    {
      name: 'priority',
      label: 'Priority',
      type: TdDynamicType.Number,
      required: true,
      min: -2,
      max: 2
    },
    {
      name: 'status',
      label: 'Status',
      type: TdDynamicElement.Select,
      required: true,
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
      selections: [
        'BUG',
        'FEATURE'
      ]
    },
    {
      name: 'timeSpent',
      label: 'Time spent',
      type: TdDynamicType.Number
    },
    {
      name: 'effort',
      label: 'Effort',
      type: TdDynamicType.Number
    },
    {
      name: 'acceptanceCriteria',
      label: 'Acceptance criteria',
      type: TdDynamicElement.Textarea
    },
    {
      name: 'userStory',
      label: 'User story',
      type: TdDynamicElement.Textarea
    },
  ];

  constructor(@Inject(MD_DIALOG_DATA) private data: any,
              private projectService: ProjectService) {}

  save() {
  }
}
