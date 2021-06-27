import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActorService } from 'src/app/services/actor-service';

@Component({
  selector: 'app-actor-add',
  templateUrl: './actor-add.component.html',
  styleUrls: ['./actor-add.component.css']
})
export class ActorAddComponent implements OnInit {

  firstname: string = '';
  lastname: string = '';
  birthdate: Date | null = null;
  photo_url: string = '';

  constructor(private _actor : ActorService,
              private router : Router) { }

  ngOnInit(): void {
  }

  addActor(){

    if(!(this.firstname && this.lastname && this.birthdate)){
      alert("Tutti i campi con l'asterisco sono obbligatori!");
      return;
    }

    let body = {
      firstname : this.firstname,
      lastname : this.lastname,
      birthdate : this.birthdate,
      photo_url : this.photo_url
    }

    this._actor.addActor(body).subscribe(
      res => {
        this.router.navigate(['actors/list']);
      }
    )
  }

} 
