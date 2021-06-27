import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Actor } from '../models/actor';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private http: HttpClient, private _userService: UserService) { }

  getActors() {
    let url = 'https://netflix.cristiancarrino.com/actor/read.php';
    return this.http.get<Actor[]>(url)
      .pipe(
        catchError(error => {
          alert(error.status + ': ' + error.error);
          return [];
        })
      )
  }

  addActor(body: any) {
    if (!this._userService.getLoggedUser()) {
      alert("Non sei Loggato");
      return of(null);
    }
    let token: string = this._userService.getLoggedUser().token;

    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    let url = 'https://netflix.cristiancarrino.com/actor/create.php';
    return this.http.post<any>(url, body, headers)
      .pipe(
        catchError(error => {
          alert(error.status + ': ' + error.error);
          return [];
        })
      )
  }

  editActor(body: any) {
    if (!this._userService.getLoggedUser()) {
      alert("Non sei Loggato");
      return of(null);
    }
    let token: string = this._userService.getLoggedUser().token;
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    let url = 'https://netflix.cristiancarrino.com/actor/update.php';
    return this.http.post<any>(url, body, headers)
      .pipe(
        catchError(error => {
          alert(error.status + ': ' + error.error);
          return [];
        })
      )
  }

  removeActor(body: any) {
    if (!this._userService.getLoggedUser()) {
      alert("Non sei Loggato");
      return of(null);
    }
    let token: string = this._userService.getLoggedUser().token;
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    let url = 'https://netflix.cristiancarrino.com/actor/delete.php';
    return this.http.post<any>(url, body, headers)
      .pipe(
        catchError(error => {
          alert(error.status + ': ' + error.error);
          return [];
        })
      )
  }
}
