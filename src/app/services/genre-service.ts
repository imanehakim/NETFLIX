import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Genre } from '../models/genre';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient, private router: Router, public _userService: UserService) { }

  getGenres() {
    let url = 'https://netflix.cristiancarrino.com/genre/read.php';
    return this.http.get(url)
      .pipe(
        catchError(error => {
          alert(error.status + ': ' + error.error);
          return [];

        })
      )
  }

  addGenre(genre: any) {
    let loggedUser = this._userService.getLoggedUser()
    if (!loggedUser) {
      alert("Non sei Loggato");
      return of(null);
    }
    let url = 'https://netflix.cristiancarrino.com/genre/create.php';
    let token: string = loggedUser.token;
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post<any>(url, genre, headers)
      .pipe(
        catchError(error => {
          alert(error.status + ': ' + error.error);
          return [];
        })
      )
  }
  //non si possono rimuovere generi o modificare perchè non ritorn il campo createdBy.
  editGenre(genre: any) {
    if (!this._userService.getLoggedUser()) {
      alert("Non sei Loggato");
      return of(null);
    }
    let token: string = this._userService.getLoggedUser().token;
    let url = 'https://netflix.cristiancarrino.com/genre/update.php';
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post<any>(url, genre, headers)
      .pipe(
        catchError(error => {
          alert(error.status + ': ' + error.error);
          return [];
        })
      )
  }

  removeGenre(genre: any) {
    if (!this._userService.getLoggedUser()) {
      alert("Non sei Loggato");
      return of(null);
    }
    let token: string = this._userService.getLoggedUser().token;
    let url = 'https://netflix.cristiancarrino.com/genre/delete.php';
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post(url, genre, headers)
      .pipe(
        catchError(error => {
          alert(error.status + ': ' + error.error);
          return [];
        })
      )
  }
}
