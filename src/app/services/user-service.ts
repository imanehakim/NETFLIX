import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   loginUrl = 'https://netflix.cristiancarrino.com/user/login.php';
  loggedUser: User | null = null;
  isLogged: boolean = false;
  rememberMe: boolean = false
  isAlertShowing: boolean = false;
  httpOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,

  ) { }

  login(username: string, password: string, rememberMe: boolean): Observable<User | null> {
    return this.http.post<User | null>(this.loginUrl, { username: username, password: password }, this.httpOption
    ).pipe(tap(response => {
      this.loggedUser = response;
      // this.isLogged = true
      this.localStorage.store('loggedUser', response);
      if (rememberMe) {//se seleziona remember me l'utente rimarrà loggato sempre a meno che non cancelli la local storage
        this.rememberMe = true
      }
    }),
      catchError(error => {
        this.loggedUser = null;
        this.logOut();
        return of(null)
      }));
 }

  logOut() {
    if (!this.rememberMe) {
      localStorage.removeItem('loggeduser')
      this.localStorage.clear('loggedUser')
      //this.isLogged = false
      this.loggedUser = null;
    } else {
      alert("Avevi selezionato il 'remember me', se vuoi rimuovere i tuoi dati dovrai cancellare la local Storage")
    }
  }

  editUserinfo(body: any) {
    if (!this.getLoggedUser()) {
      alert("Non sei Loggato");
      return of(null);
    }
    let token: string = this.getLoggedUser().token;

    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };

    let url = 'https://netflix.cristiancarrino.com/user/edit.php';
    return this.http.post<any>(url, body, headers)
      .pipe(
        catchError(error => {
          alert(error.status + ': ' + error.error);
          return [];
        })
      )
  }

  async modifyFavourite(body: { ids: string }, route: string) {
    if (!this.getLoggedUser()) {
      alert("Non sei Loggato");
      return of(null);
    }
    let token: string = this.getLoggedUser().token;

    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    let url = 'https://netflix.cristiancarrino.com/user/' + route + '.php';
    return await this.http.post<any>(url, body, headers).toPromise()
      .catch(error => {
        alert(error.status + ': ' + error.error);
        return [];
      })
  }
  
  getLoggedUser(): User | null {
    this.loggedUser = this.localStorage.retrieve('loggedUser');
    return this.loggedUser;
  }
}
