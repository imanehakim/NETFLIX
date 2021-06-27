import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from 'src/app/models/film';
import { FilmService } from 'src/app/services/film-service';
import { UserService } from 'src/app/services/user-service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loadingFilms: boolean = true
  lastfilms: Film[] | null = null;
  topFilms: Film[] | null = null;
  faEdit = faEdit
  constructor(private _filmService: FilmService, public _userService: UserService, private router: Router) { }

  ngOnInit(): void {

    this.getLastFilms();
    this.loadingFilms = false
    this.getTopFilms();
  }
  editFilm(id: number) {
    this.router.navigate(['films/edit/' + id]);
  }
  getLastFilms() {
    this._filmService.getFilms().subscribe(
      res => {

        this.lastfilms = res;
        this.lastfilms = this.lastfilms.sort((film1, film2) => {
          return (new Date(film2.created_at || '')).getTime() - (new Date(film1.created_at || '')).getTime();
        }).slice(0, 4);

      }
    );
  }
  getTopFilms() {

    this._filmService.getFilms().subscribe(
      res => {

        this.topFilms = res;
        this.topFilms = this.topFilms.sort((film1, film2) => {
          return film2.vote - film1.vote;
        }).slice(0, 4);

      }
    );

  }
}
