import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from 'src/app/models/actor';
import { Film } from 'src/app/models/film';
import { ActorService } from 'src/app/services/actor-service';
import { UserService } from 'src/app/services/user-service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {
  actors: Actor[] | null = null;
  faEdit = faEdit;
  constructor(private _actorService: ActorService, public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getActors();
  }
  getActors() {
    this._actorService.getActors().subscribe(
      res => {

        this.actors = res;


      }
    );
  }

  addActor() {
    this.router.navigate(['actors/add']);
  }

  editActor(id: number) {
    this.router.navigate(['actors/edit/' + id]);
  }
}
