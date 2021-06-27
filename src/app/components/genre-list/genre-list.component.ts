import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/genre';
import { GenreService } from 'src/app/services/genre-service';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user-service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css']
})
export class GenreListComponent implements OnInit {
  faFilm = faFilm;
  faEdit = faEdit
  genres: Genre
  loadingGenre: boolean = true
  constructor(private _genreService: GenreService, public _userService: UserService) { }

  ngOnInit(): void {
    this._genreService.getGenres().subscribe(
      res => {
        this.genres = res;
        this.loadingGenre = false;
      }
    );
  }
}
