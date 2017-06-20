import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs';

import { User, ProjectService } from './project.service';

@Component({
  templateUrl: 'members.component.html'
})
export class MembersComponent {
  loading: boolean = false;
  projectAlias: string = null;
  members: User[] = null;

  constructor(private route: ActivatedRoute, private router: Router,
              private projectService: ProjectService) {}

  ngOnInit() {
    this.loading = true;
    this.route.parent.params.subscribe(params => {
      this.projectAlias = params['id'];
      this.projectService
        .fetchProjectMembers(this.projectAlias)
        .map(members => this.members = members)
        .finally(() => this.loading = false)
        .subscribe();
    });
  }
}
