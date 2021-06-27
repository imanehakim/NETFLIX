import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  rememberMe: boolean = false;
  username: string = '';
  password: string = '';
  constructor(public userService: UserService, private router: Router) { }

  isLogged: boolean;
  ngOnInit(): void {


  }

  login() {
    this.router.navigate(['/login']);
  }

  logOut() {
    this.userService.logOut();
  }

  films() {
    this.router.navigate(['/films/list']);
  }

  actors() {
    this.router.navigate(['/actors/list']);
  }

  genres() {
    this.router.navigate(['genres/list']);
  }
}
