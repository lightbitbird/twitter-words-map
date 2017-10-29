import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Hero} from './models/hero';
import {HeroService} from './hero/services/hero.service';
import {Word} from "./models/marker";
import {WordService} from "./map/services/word.service";

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: '../html/dashboard.component.html',
  styleUrls: ['../css/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  words: Word[] = [];

  constructor(private router: Router,
              private wordService: WordService) {
  }

  ngOnInit(): void {
    this.wordService.getWords()
      .subscribe(markers => {
        markers.map(
          marker => marker.words.map(
            word => this.words.push(word)
          ))
        this.words = this.words.slice(0, 20);
      }, error => console.log(error));
  }

  gotoDetail(word: Word): void {
    let link = ['/detail', word.id];
    this.router.navigate(link);
  }
}
