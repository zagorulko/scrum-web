import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '../api.service';

export class User {
  username: string;
  fullName: string;
  email: string;
};

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
  creationDate: Date;
  status: string;
  kind: string;
  priority: number;
  acceptanceCriteria: string;
  userStory: string;
  initialEstimate: number;
  vcsCommit: string;
  btsTicket: string;
  completionDate: Date;
  timeSpent: number;
  effort: number;
  assignees: User[];
  assignedToMe: boolean;
  onCurrentSprint: boolean;
};

export class Comment {
  id: number;
  creationDate: Date;
  author: string;
  message: string;
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

  fetchProjectMembers(projectAlias): Observable<User[]> {
    return this.apiService
      .get('/projects/' + projectAlias + "/members")
      .map(response => response.json()['members']);
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
      .map(response => response.json()['tasks'])
      .map(this.processTasks);
  }

  fetchSprint(id): Observable<Sprint> {
    return this.apiService
      .get('/sprints/' + id)
      .map(response => response.json());
  }

  fetchSprintTasks(id): Observable<Task[]> {
    return this.apiService
      .get('/sprints/' + id + '/tasks')
      .map(response => response.json()['tasks'])
      .map(this.processTasks);
  }

  fetchTask(id): Observable<Task> {
    return this.apiService
      .get('/tasks/' + id)
      .map(response => response.json());
  }

  fetchTaskComments(taskId): Observable<Comment[]> {
    return this.apiService
      .get('/tasks/' +taskId + '/comments')
      .map(response => response.json()['comments'])
      .map(comments => {
        for (let i = 0; i < comments.length; i++)
          comments[i].creationDate = new Date(comments[i].creationDate);
        comments.sort((a, b) =>
          b.creationDate.getTime() - a.creationDate.getTime()
        );
        return comments;
      });
  }

  private processTasks(tasks: Task[]): Task[] {
    for (let i = 0; i < tasks.length; i++)
      tasks[i].creationDate = new Date(tasks[i].creationDate);
    return tasks;
  }
}
