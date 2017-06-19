import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

const API_URL: string = environment.apiBaseUrl + "/v1";

@Injectable()
export class ApiService {
  accessToken: string = null;

  constructor(private http: Http) {}

  get(endpoint: string, options: RequestOptionsArgs = {}): Observable<Response> {
    let headers = new Headers();
    this.addAuth(headers);
    options.headers = headers;

    return this.http
      .get(API_URL + endpoint, options)
      .retryWhen(this.repeatOnErrors)
      .catch(this.handleError);
  }

  post(endpoint: string, body: any, options: RequestOptionsArgs = {}): Observable<Response> {
    let headers = new Headers();
    this.addAuth(headers);
    headers.append('Content-Type', 'application/json');
    options.headers = headers;

    return this.http
      .post(API_URL + endpoint, JSON.stringify(body), options)
      .retryWhen(this.repeatOnErrors)
      .catch(this.handleError);
  }

  put(endpoint: string, body: any, options: RequestOptionsArgs = {}): Observable<Response> {
    let headers = new Headers();
    this.addAuth(headers);
    headers.append('Content-Type', 'application/json');
    options.headers = headers;

    return this.http
      .put(API_URL + endpoint, JSON.stringify(body), options)
      .retryWhen(this.repeatOnErrors)
      .catch(this.handleError);
  }

  delete(endpoint: string, options: RequestOptionsArgs = {}): Observable<Response> {
    let headers = new Headers();
    this.addAuth(headers);
    options.headers = headers;

    return this.http
      .delete(API_URL + endpoint, options)
      .retryWhen(this.repeatOnErrors)
      .catch(this.handleError);
  }

  private addAuth(headers: Headers) {
    if (this.accessToken)
      headers.append('Authorization', 'Bearer ' + this.accessToken);
  }

  private repeatOnErrors(errors: Observable<any>): Observable<any> {
    return errors.flatMap(err => {
      if (err.status >= 400 && err.status < 500)
        return Observable.throw(err);
      else
        return Observable.timer(1000);
    });
  }

  private handleError(error) {
    try {
      let p = error.json();
      if (p['message'])
        return Observable.throw(p['message']);
    } catch (e) {}
    if (error['status'])
      return Observable.throw(error['statusText']);
    return Observable.throw('Unknown server error');
  }
}
