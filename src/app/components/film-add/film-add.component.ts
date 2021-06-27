import { NodeWithI18n } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Actor } from 'src/app/models/actor';
import { Film } from 'src/app/models/film';
import { Genre } from 'src/app/models/genre';
import { ActorService } from 'src/app/services/actor-service';
import { FilmService } from 'src/app/services/film-service';
import { GenreService } from 'src/app/services/genre-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-film-add',
  templateUrl: './film-add.component.html',
  styleUrls: ['./film-add.component.css']
})
export class FilmAddComponent implements OnInit {
  actorsToInsert: any = [];
  actorToInsert: Actor
  actors
  genres
  genreToInsert: Genre
  genresToInsert: any = [];
  title: string
  cover_url: string
  duration
  director
  film: Film = {
    id: 0,
    title: '',
    description: '',
    plot: '',
    director: '',
    duration: '',
    release_year: 0,
    cover_url: '',
    tags: '',
    created_by: 0,
    //stars: [],
    actors: [],
    genres: [],
    vote: 0,
    //  starRating: 0,
  };
  constructor(private _actorService: ActorService, private _genreService: GenreService, private _userService: UserService, private _filmService: FilmService, private router: Router) { }

  ngOnInit(): void {
    this.actors = this._actorService.getActors().subscribe(
      res => {

        this.actors = res;

      }
    );

    this.genres = this._genreService.getGenres().subscribe(
      res => {
        this.genres = res;

      }
    );

  }

  actorSelect(id: number) {
    this.actorToInsert = this.actors.find((actor) => actor.id === id);

    if (this.actorToInsert) {
      this.actors.map((actorToFind) => {
        if (actorToFind.id === id) {
          actorToFind.selected = !actorToFind.selected;
          if (actorToFind.selected) {

            this.actorsToInsert.push(this.actorToInsert)
          } else {
            this.removeActor(this.actorToInsert)
          }
        }
      });
    }
  }
  removeActor(actor: Actor) {
    const index = this.actorsToInsert.map(function (e) { return e.id; }).indexOf(actor.id);

    if (index > -1) {
      this.actorsToInsert.splice(index, 1);
    }
  }

  genreSelect(name: string) {
    this.genreToInsert = this.genres.find((genre) => genre.name === name);

    if (this.genreToInsert) {
      this.genres.map((genreToFind) => {
        if (genreToFind.name === name) {

          genreToFind.selected = !genreToFind.selected;
          if (genreToFind.selected) {

            this.genresToInsert.push(this.genreToInsert)
          } else {
            this.removeGenre(this.genreToInsert)
          }
        }
      });
    }

  }
  removeGenre(genre: Genre) {
    const index = this.genresToInsert.map(function (e) { return e.id; }).indexOf(genre.id);

    if (index > -1) {
      this.genresToInsert.splice(index, 1);
    }
  }
  addFilm() {
    this.film.actors = this.actorsToInsert;
    this.film.genres = this.genresToInsert;
    let user = this._userService.getLoggedUser()
    this.film.created_by = user.id
    this.film.created_at = new Date()

    let prova = this._filmService.addFilm(this.film)

    this._filmService.addFilm(this.film).subscribe(
      res => {

        this.router.navigate(['films/list']);
      }
    )
  }
}
