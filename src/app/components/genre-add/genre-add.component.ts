import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenreService } from 'src/app/services/genre-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-genre-add',
  templateUrl: './genre-add.component.html',
  styleUrls: ['./genre-add.component.css']
})
export class GenreAddComponent implements OnInit {

  name: string = '';
  image_url: string = '';

  constructor(private _genre: GenreService,
    public userService :UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  addGenre() {
    if (!this.name) {
      alert("Il nome è obbligatorio!");
      return;
    }

    let genre = {
      name: this.name,
      image_url: this.image_url
    }
    this._genre.addGenre(genre).subscribe(
      res => {
        this.router.navigate(['genres/list']);
      }
    )
  }

}
