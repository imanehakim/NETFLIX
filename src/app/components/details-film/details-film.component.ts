import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';
import { FilmService } from 'src/app/services/film-service';

@Component({
  selector: 'app-details-film',
  templateUrl: './details-film.component.html',
  styleUrls: ['./details-film.component.css']
})
export class DetailsFilmComponent implements OnInit {
  filmDetails: Film
  display: boolean = true;
  constructor(private _filmService: FilmService) { }

  ngOnInit(): void {

    this.filmDetails = this._filmService.filmDetails;
    if (this.filmDetails == null) {
      this.display = false

    }

  }

}
