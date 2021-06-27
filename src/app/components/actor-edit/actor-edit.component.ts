import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor } from 'src/app/models/actor';
import { ActorService } from 'src/app/services/actor-service';

@Component({
  selector: 'app-actor-edit',
  templateUrl: './actor-edit.component.html',
  styleUrls: ['./actor-edit.component.css']
})
export class ActorEditComponent implements OnInit {

  actor: Actor | null = null;
  id: string = '';
  firstname: string = '';
  lastname: string = '';
  birthdate: Date | undefined = undefined;
  photo_url: string | null;
  isAlertShowing: boolean = false;

  constructor(private _actor: ActorService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id;
      this.getActor();
    });
  }

  getActor() {
    this._actor.getActors().subscribe(
      (res) => {
        let actorList = res;
        actorList.map(actor => {
          if (actor.id == parseInt(this.id)) {
            this.actor = actor;
            this.visualizzaDati();
          }
        });
      }
    );
  }
  visualizzaDati() {
    this.firstname = this.actor!.firstname;
    this.lastname = this.actor!.lastname;
    this.birthdate = this.actor!.birthdate;
    this.photo_url = this.actor!.photo_url;
  }

  editActor() {
    if (!(this.firstname && this.lastname && this.birthdate)) {
      alert("Tutti i campi sono obbligatori!");
      return;
    }
    let body = {
      firstname: this.firstname,
      lastname: this.lastname,
      birthdate: this.birthdate,
      photo_url: this.photo_url
    }


    this._actor.editActor(body).subscribe(
      res => {

      }
    )
    this.router.navigate(['actors/list']);
  }
  //alert conferma eliminaz.
  showAndHideAlert() {
    this.isAlertShowing = !this.isAlertShowing;
  }

  deleteActor() {
    this.showAndHideAlert();
    this._actor.removeActor({ id: parseInt(this.id) }).subscribe(
      res => {
        this.router.navigate(['actors/list']);
      });
  }
}
