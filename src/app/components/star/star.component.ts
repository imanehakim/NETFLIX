import { Component, Input, OnInit } from '@angular/core';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {

  @Input() vote: any;
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  faStarEmpty = faStarEmpty;
  fullStars: number[] = [];
  halfStars: number = 0;
  voidStars: number[] = [];
  MAX_STARS: number = 5;

  constructor() { }

  ngOnInit(): void {
    for (let i = 1; i <= this.vote; i++) {
      this.fullStars.push(i);
    }
    if (this.vote - this.fullStars.length == 0)
      this.halfStars = 0;
    else
      this.halfStars = 1;
    let length = this.MAX_STARS - this.fullStars.length - this.halfStars;
    for (let i = 1; i <= length; i++) {
      this.voidStars.push(i);
    }
  }

}
