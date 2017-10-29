import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {Word} from '../models/marker';
import {WordService} from './services/word.service';

@Component({
  moduleId: module.id,
  selector: 'my-word-detail',
  templateUrl: '../../html/map/word-detail.component.html',
  styleUrls: ['../../css/hero-detail.component.css']
})

export class WordDetailComponent implements OnInit {
  @Input() word: Word;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(private wordService: WordService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.wordService.getWord(id)
          .subscribe(word => {
            console.log(word);
            this.word = word
          }, error => console.log(error));
      } else {
        this.navigated = false;
        this.word = new Word();
      }
    });
  }

  save(): void {
    this.wordService
      .save(this.word)
      .then(word => {
        this.word = word; // saved word, w/ id if new
        this.goBack(word);
      })
      .catch(error => this.error = error); // TODO: Display error message
  }

  goBack(savedWord: Word = null): void {
    this.close.emit(savedWord);
    if (this.navigated) {
      window.history.back();
    }
  }
}
