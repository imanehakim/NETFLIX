import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor } from 'src/app/models/actor';
import { Film } from 'src/app/models/film';
import { Genre } from 'src/app/models/genre';
import { ActorService } from 'src/app/services/actor-service';
import { FilmService } from 'src/app/services/film-service';
import { GenreService } from 'src/app/services/genre-service';

@Component({
  selector: 'app-film-edit',
  templateUrl: './film-edit.component.html',
  styleUrls: ['./film-edit.component.css']
})
export class FilmEditComponent implements OnInit {

  film: Film | null = null;
  id: string = '';
  title: string = '';
  director: string = '';
  description: string = '';
  plot: string = '';
  duration: string = '';
  vote: string = '';
  release_year: string = '';
  tags: string = '';
  actorList: Actor[] | null = null;
  genreList: Genre[] | null = null;
  selectedActor: string = '';
  selectedActors: string[] = [];
  selectedActorList: Actor[] = [];
  selectedGenre: string = '';
  selectedGenres: string[] = [];
  selectedGenreList: Genre[] = [];
  selectedTags: string[] = [];
  cover_url: string = '';
  isAlertShowing: boolean = false;

  constructor(private _genres: GenreService,
    private _actor: ActorService,
    private _film: FilmService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getGenres();
    this.getActors();

    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id;
      this.getFilm();
    });
  }

  getFilm() {
    this._film.getFilms().subscribe(
      (res) => {
        let filmList = res;
        filmList.map(film => {
          if (film.id == parseInt(this.id)) {
            this.film = film;
            this.visualizzaDati();
          }
        });
      }
    );
  }

  visualizzaDati() {
    this.title = this.film!.title;
    this.description = this.film!.description;
    this.plot = this.film!.plot;
    this.director = this.film!.director;
    this.duration = this.film!.duration;
    this.vote = this.film!.vote.toString();
    this.release_year = this.film!.release_year.toString();
    this.cover_url = this.film!.cover_url;
    this.tags = this.film!.tags;
    this.selectedActorList = this.film!.actors;
    this.selectedGenreList = this.film!.genres;

    this.selectedActorList.map(actor => {
      this.selectedActors.push(actor.firstname + " " + actor.lastname);
    })

    this.selectedGenreList.map(genre => {
      this.selectedGenres.push(genre.name);
    })

    this.tagIsChanged(this.film!.tags);
  }

  getGenres() {
    this._genres.getGenres().subscribe(
      (res) => {
        this.genreList = res;
      }
    );
  }

  getActors() {
    this._actor.getActors().subscribe(
      (res) => {
        this.actorList = res;
      }
    );
  }

  // Actors Input
  actorIsChanged(actorName: string) {
    if (!this.selectedActors.includes(actorName) && actorName != 'Scegli...') {
      this.selectedActors.push(actorName);
      this.addActorObj(actorName)
    }
  }

  addActorObj(actorName: string) {
    let arr = actorName.split(" ");
    let firstName = arr[0].trim();
    let lastName = arr[1].trim();

    this.actorList!.map(actor => {
      if (actor.firstname.trim() == firstName && actor.lastname.trim() == lastName) {
        this.selectedActorList.push(actor);
        return;
      }
    })
  }

  removeActor(actor: string) {
    const index = this.selectedActors.indexOf(actor);
    if (index > -1) {
      this.selectedActors.splice(index, 1);
    }
    this.removeActorObj(actor);
  }

  removeActorObj(actorName: string) {
    actorName.trim();
    let arr = actorName.split(" ");
    let firstName = arr[0].trim();
    let lastName = arr[1].trim();
    let i = 0;

    this.selectedActorList.map(actor => {
      if (actor.firstname.trim() == firstName && actor.lastname.trim() == lastName) {
        this.selectedActorList.splice(i, 1);
        return;
      }
      i++;
    });
  }

  //Genre Input
  genreIsChanged(genreName: string) {
    if (!this.selectedGenres.includes(genreName) && genreName != 'Scegli...') {
      this.selectedGenres.push(genreName);
      this.addGenreObj(genreName)
    }
  }

  addGenreObj(genreName: string) {

    genreName = genreName.trim();

    this.genreList!.map(genre => {
      if (genre.name.trim() == genreName) {
        this.selectedGenreList.push(genre);
        return;
      }
    })
  }

  removeGenre(genre: string) {
    const index = this.selectedGenres.indexOf(genre);
    if (index > -1) {
      this.selectedGenres.splice(index, 1);
    }
    this.removeGenreObj(genre);
  }

  removeGenreObj(genreName: string) {
    genreName = genreName.trim();
    let i = 0;

    this.selectedGenreList.map(genre => {
      if (genre.name.trim() == genreName) {
        this.selectedGenreList.splice(i, 1);
        return;
      }
      i++;
    });
  }

  //Tags Input
  tagIsChanged(event: string) {
    this.tags = event;
    let arr: string[] = [];
    this.selectedTags = event.split(",");
    this.selectedTags.map(x => {
      x.trim();
      if (x != '' && x != ' ')
        arr.push(x);
      this.selectedTags = arr;
    });
  }

  removeTag(tag: string) {
    let arr: string[] = [];
    let str: string = '';
    this.selectedTags.map(x => {
      if (x != tag) {
        arr.push(x);
        str += x.trim() + ', ';
      }
    })
    this.selectedTags = arr;
    this.tags = str;
  }

  //Edit Film Button
  editFilm() {
    if (!(this.title && this.description && this.plot && this.director && this.duration && this.vote && this.release_year && this.cover_url && this.tags && this.selectedActorList.length > 0 && this.selectedGenreList.length > 0)) {
      alert("Tutti i campi sono obbligatori!");
      return;
    }

    let actorsId = this.getActorsId();
    let genresId = this.getGenresId();

    let body = {
      "id": this.id,
      "title": this.title,
      "description": this.description,
      "plot": this.plot,
      "director": this.director,
      "duration": this.duration,
      "vote": parseInt(this.vote),
      "release_year": parseInt(this.release_year),
      "cover_url": this.cover_url,
      "tags": this.tags,
      "actors": actorsId,
      "genres": genresId
    }

    this._film.editFilm(body).subscribe(
      res => {

      }
    )
    this.router.navigate(['films/list']);
  }

  getActorsId() {
    let arr: { id: number }[] = []
    this.selectedActorList.map(x => {
      arr.push({ id: x.id });
    })
    return arr;
  }

  getGenresId() {
    let arr: { id: number | undefined }[] = []
    this.selectedGenreList.map(x => {
      arr.push({ id: x.id });
    })
    return arr;
  }

  showAndHideAlert() {
    this.isAlertShowing = !this.isAlertShowing;
  }

  deleteFilm() {
    this.showAndHideAlert();

    this._film.removeFilm({ id: parseInt(this.id) }).subscribe(
      res => {

        this.router.navigate(['films/list']);
      });
  }

}
