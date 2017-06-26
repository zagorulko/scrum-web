import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TdDialogService } from '@covalent/core';
import { Observable } from 'rxjs';

import { NewTaskDialogComponent } from './new-task-dialog.component';
import { Task, ProjectService } from './project.service';

@Component({
  templateUrl: 'backlog.component.html'
})
export class BacklogComponent {
  loading: boolean = false;
  projectAlias: string = null;
  tasks: Task[] = null;
  filteredTasks: Task[] = null;
  uncompletedOnly: boolean = true;
  assignedToMeOnly: boolean = false;
  orderBy: string = 'date';
  reverseOrder: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router,
              private tdDialogService: TdDialogService,
              private projectService: ProjectService,
              private dialog: MdDialog) {}

  ngOnInit() {
    this.loading = true;
    this.route.parent.params.subscribe(params => {
      this.projectAlias = params['id'];
      this.projectService
        .fetchProjectTasks(this.projectAlias)
        .map(tasks => {
          this.tasks = tasks;
          this.applyFilters();
        })
        .finally(() => this.loading = false)
        .subscribe();
    });
  }

  toggleOrder() {
    this.reverseOrder = !this.reverseOrder;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredTasks = [];
    for (let i = 0; i  < this.tasks.length; i++) {
      let task = this.tasks[i];
      if (this.uncompletedOnly && task.status == 'DONE')
        continue;
      if (this.assignedToMeOnly && !task.assignedToMe)
        continue;
      task['baseIndex'] = i;
      this.filteredTasks.push(task);
    }

    switch (this.orderBy) {
    case 'date':
      this.filteredTasks.sort((a, b) =>
        b.creationDate.getTime() - a.creationDate.getTime());
      break;
    case 'title':
      this.filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'priority':
      this.filteredTasks.sort((a, b) => b.priority - a.priority);
      break;
    }

    if (this.reverseOrder)
      this.filteredTasks.reverse();
  }

  removeTask(i: number) {
    let task = this.tasks[i];
    this.tdDialogService.openConfirm({
      title: task.title,
      message: 'Are you sure you want to delete the task?',
      acceptButton: 'Delete'
    }).afterClosed().subscribe(yes => {
      if (yes) {
        this.projectService
          .deleteTask(task.id)
          .subscribe(ok => {
            this.tasks.splice(i, 1);
            this.applyFilters();
          });
      }
    });
  }

  newTask() {
    let dialogRef = this.dialog.open(NewTaskDialogComponent, {
      data: {
        projectAlias: this.projectAlias
      }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
