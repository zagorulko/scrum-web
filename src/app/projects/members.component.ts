import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs';

import { Project, Sprint, Task, ProjectService } from './project.service';

@Component({
  templateUrl: 'members.component.html'
})
export class MembersComponent {
  loading: boolean = false;
  project: Project = null;

  constructor(private route: ActivatedRoute, private router: Router,
              private projectService: ProjectService) {}

  ngOnInit() {}
}
