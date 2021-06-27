import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from 'src/app/models/film';
import { FilmService } from 'src/app/services/film-service';
import { UserService } from 'src/app/services/user-service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {
  filmDetails
  details: boolean
  films: Film[] | null = null;
  filmsVisual: Film[] | null = null
  search: string = '';
  openSearchField: boolean = false;
  searchField: string = 'title';
  loadingFilms: boolean = true;
  faEdit = faEdit

  constructor(public _filmService: FilmService, private router: Router, public _userService: UserService) { }

  ngOnInit(): void {
    this._filmService.getFilms().subscribe(
      res => {
          this.films = res;
          this.filmsVisual = res;
this.loadingFilms = false;
 }
    );

  }

  searchFilm() {
    this.filmsVisual = this.films.filter((film) => {
      return film.title.toLowerCase().includes(this.search.toLowerCase());
    });
  }
  editFilm(id: number) {
    this.router.navigate(['films/edit/' + id]);
  }

}
