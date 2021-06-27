import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActorAddComponent } from "./components/actor-add/actor-add.component";
import { ActorEditComponent } from "./components/actor-edit/actor-edit.component";
import { ActorListComponent } from "./components/actor-list/actor-list.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { DetailsFilmComponent } from "./components/details-film/details-film.component";
import { FilmAddComponent } from "./components/film-add/film-add.component";
import { FilmEditComponent } from "./components/film-edit/film-edit.component";
import { FilmListComponent } from "./components/film-list/film-list.component";
import { GenreAddComponent } from "./components/genre-add/genre-add.component";
import { GenreEditComponent } from "./components/genre-edit/genre-edit.component";
import { GenreListComponent } from "./components/genre-list/genre-list.component";
import { LoginComponent } from "./components/login/login.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'details', component: DetailsFilmComponent},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'films/list', component: FilmListComponent },
    { path: 'films/add', component: FilmAddComponent },
    { path: 'films/edit/:id', component: FilmEditComponent},
    { path: 'actors/list', component: ActorListComponent },
    { path: 'actors/add', component: ActorAddComponent },
    { path: 'actors/edit/:id', component: ActorEditComponent},
    { path: 'genres/list', component: GenreListComponent },
    { path: 'genres/add', component:  GenreAddComponent},
    { path: 'genres/edit/:id', component: GenreEditComponent },
    { path: 'user/edit', component:UserEditComponent },
];
  
  
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  