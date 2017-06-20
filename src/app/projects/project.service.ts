import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '../api.service';

export class Project {
  alias: string;
  name: string;
  description: string;
  vcsLink: string;
  btsLink: string;
  cisLink: string;
};

export class Sprint {
  id: number;
  number: number;
  startDate: Date;
  endDate: Date;
  goal: string;
};

export class Task {
  id: number;
  sprint: number;
  parentTask: number;
  author: string;
  title: string;
  creationDate: string;
  status: string;
  kind: string;
  priority: number;
};

@Injectable()
export class ProjectService {
  constructor(private apiService: ApiService) {}

  fetchProjectList(): Observable<Project[]> {
    return this.apiService
      .get('/projects')
      .map(response => response.json()['projects']);
  }

  fetchProject(alias): Observable<Project> {
    return this.apiService
      .get('/projects/' + alias)
      .map(response => response.json());
  }

  fetchProjectSprints(projectAlias): Observable<Sprint[]> {
    return this.apiService
      .get('/projects/' + projectAlias + "/sprints")
      .map(response => response.json()['sprints'])
      .map(sprints => {
        for (let i = 0; i < sprints.length; i++) {
          sprints[i].startDate = new Date(sprints[i].startDate);
          sprints[i].endDate = new Date(sprints[i].endDate);
        }
        sprints.sort((a: Sprint, b: Sprint) =>
            b.startDate.getTime() - a.startDate.getTime()
        )
        for (let i = 0; i < sprints.length; i++)
          sprints[i].number = sprints.length - i;
        return sprints;
      });
  }

  fetchProjectTasks(projectAlias): Observable<Task[]> {
    return this.apiService
      .get('/projects/' + projectAlias + "/tasks")
      .map(response => response.json()['tasks']);
  }

  fetchSprint(id): Observable<Sprint> {
    return this.apiService
      .get('/sprints/' + id)
      .map(response => response.json());
  }

  fetchTask(id): Observable<Sprint> {
    return this.apiService
      .get('/tasks/' + id)
      .map(response => response.json());
  }
}
