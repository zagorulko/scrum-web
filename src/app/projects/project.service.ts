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
  currentSprint: number;
};

export class Sprint {
  id: number;
  number: number;
  startDate: Date;
  endDate: Date;
  goal: string;
};

export class BurndownPoint {
  date: Date;
  actually_left: number;
  should_be_left: number;
}

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
        return sprints;
      });
  }

  fetchProjectTasks(projectAlias): Observable<Task[]> {
    return this.apiService
      .get('/projects/' + projectAlias + "/tasks")
      .map(response => response.json()['tasks'])
      .map(tasks => {
        for (let i = 0; i < tasks.length; i++)
          tasks[i].creationDate = new Date(tasks[i].creationDate);
        return tasks;
      });
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
      .map(tasks => {
        for (let i = 0; i < tasks.length; i++)
          tasks[i].creationDate = new Date(tasks[i].creationDate);
        return tasks;
      });
  }

  fetchSprintBurndown(id): Observable<BurndownPoint[]> {
    return this.apiService
      .get('/sprints/' + id + '/burndown')
      .map(response => response.json()['burndown'])
      .map(burndown => {
        for (let i = 0; i < burndown.length; i++)
          burndown[i].date = new Date(burndown[i].date);
        return burndown;
      });
  }

  fetchTask(id): Observable<Task> {
    return this.apiService
      .get('/tasks/' + id)
      .map(response => response.json());
  }

  updateTask(id, d): Observable<any> {
    return this.apiService
      .put('/tasks/' + id, d)
      .map(response => response.json());
  }

  deleteTask(id): Observable<any> {
    return this.apiService
      .delete('/tasks/' + id)
      .map(response => response.json());
  }

  fetchTaskComments(taskId): Observable<Comment[]> {
    return this.apiService
      .get('/tasks/' +taskId + '/comments')
      .map(response => response.json()['comments'])
      .map(comments => {
        for (let i = 0; i < comments.length; i++)
          comments[i].creationDate = new Date(comments[i].creationDate);
        return comments;
      });
  }

  postTaskComment(taskId, message): Observable<number> {
    return this.apiService
      .post('/tasks/' +taskId + '/comments', {message})
      .map(response => response.json()['id']);
  }
}
