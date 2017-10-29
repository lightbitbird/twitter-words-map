import {Component, OnInit, OnChanges} from '@angular/core';
import {Router} from '@angular/router';

import {Word, Marker} from '../models/marker';
import {WordService} from './services/word.service';
import {Observable} from "rxjs";

@Component({
  moduleId: module.id,
  selector: 'my-words',
  templateUrl: '../../html/map/words.component.html',
  styleUrls: ['../../css/heroes.component.css']
})
export class WordsComponent implements OnInit {
  words: Word[] = [];
  selectedWord: Word;
  addingWord = false;
  error: any;

  constructor(private router: Router,
              private wordService: WordService) {
  }

  getWords(): void {
    let markers: Marker[] = [];
    this.wordService.getWords()
      .subscribe(markers => {
        markers.map(
          marker => marker.words.map(
            word => this.words.push(word)
          ))
        this.words = this.words.slice(0, 20);
      }, error => console.log(error));
  }

  addWord(): void {
    this.addingWord = true;
    this.selectedWord = null;
  }

  close(savedWord: Word): void {
    this.addingWord = false;
    if (savedWord) {
      this.getWords();
    }
  }

  deleteWord(word: Word, event: any): void {
    event.stopPropagation();
    this.wordService
      .delete(word)
      .subscribe(res => {
        this.words = [];
        // this.words = this.words.filter(h => h !== word);
        // if (this.selectedWord === word) {
        //   this.selectedWord = null;
        // }
        this.getWords();
      }, error => console.log(error));
  }

  ngOnInit(): void {
    this.getWords();
  }

  onSelect(word: Word): void {
    this.selectedWord = word;
    this.addingWord = false;
  }

  reload(): void {
    this.router.navigate(['/words']);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedWord.id]);
  }
}
