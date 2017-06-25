import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs';

import { Sprint, Task, ProjectService } from './project.service';

@Component({
  templateUrl: 'report.component.html'
})
export class ReportComponent {
  loading: boolean = false;
  projectAlias: string = null;
  sprint: Sprint = null;
  chartData = [];

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
            .fetchSprintBurndown(sprintId)
            .map(burndown => {
              let datePipe = new DatePipe('en-US');
              let actually_left = [];
              let should_be_left = [];
              for (let i = 0; i < burndown.length; i += 3) {
                let dateStr = datePipe.transform(burndown[i].date);
                if (burndown[i].date <= new Date()) {
                  actually_left.push({
                    'name': dateStr,
                    'value': burndown[i].actually_left
                  });
                }
                should_be_left.push({
                  'name': dateStr,
                  'value': burndown[i].should_be_left
                });
              }
              this.chartData = [
                {
                  'name': 'Actually left',
                  'series': actually_left
                },
                {
                  'name': 'Should be left',
                  'series': should_be_left
                }
              ];
            })
        )
        .finally(() => this.loading = false)
        .subscribe();
      })
    });
  }
}
