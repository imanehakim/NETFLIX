import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Film } from '../models/film';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  filmDetails: Film

  constructor(private http: HttpClient, private router: Router, private _userService: UserService) { }

  getFilms() {
    let url = 'https://netflix.cristiancarrino.com/film/read.php';
    return this.http.get(url)
      .pipe(
        catchError(error => {
          alert(error.status + ': ' + error.error);
          return [];
        })
      )
  }

  addFilm(film: Film) {
    let loggedUser = this._userService.getLoggedUser()
    if (!loggedUser) {
      alert("Non sei Loggato");
      return of(null);
    }
    let url = 'https://netflix.cristiancarrino.com/film/create.php';
    let token: string = loggedUser.token;
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post<any>(url, film, headers)
      .pipe(
        catchError(error => {
          alert(error.status + ': ' + error.error);
          return [];
        })
      )
  }

  editFilm(film: any) {
    if (!this._userService.getLoggedUser()) {
      alert("Non sei Loggato");
      return of(null);
    }
    let token: string = this._userService.getLoggedUser().token;
    let url = 'https://netflix.cristiancarrino.com/film/update.php';
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post<any>(url, film, headers)
      .pipe(
        catchError(error => {
          alert(error.status + ': ' + error.error);
          return [];
        })
      )
  }

  removeFilm(film: { id: number }) {
    if (!this._userService.getLoggedUser()) {
      alert("Non sei Loggato");
      return of(null);
    }
    let token: string = this._userService.getLoggedUser().token;
    let url = 'https://netflix.cristiancarrino.com/film/delete.php';
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post(url, film, headers)
      .pipe(
        catchError(error => {
          alert(error.status + ': ' + error.error);
          return [];
        })
      )
  }

  getDetailsFilm(film?: Film) {
    this.filmDetails = film
    this.router.navigate(['/details']);
  }
}
