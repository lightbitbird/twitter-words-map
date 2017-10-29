import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { WordSearchService } from './services/word-search.service';
import { Word } from '../models/marker';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'word-search',
  templateUrl: '../../html/map/word-search.component.html',
  styleUrls: ['../../css/hero-search.component.css'],
  providers: [WordSearchService]
})
export class WordSearchComponent implements OnInit {
  words: Observable<Word[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private wordSearchService: WordSearchService,
    private router: Router) { }

  search(term: string): void {
    // Push a search term into the observable stream.
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.words = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.wordSearchService.search(term)
        // or the observable of empty heroes if no search term
        : Observable.of<Word[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(`Error in component ... ${error}`);
        return Observable.of<Word[]>([]);
      });
  }

  gotoDetail(word: Word): void {
    let link = ['/detail', word.id];
    this.router.navigate(link);
  }
}
