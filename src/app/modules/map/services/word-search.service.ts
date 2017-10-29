import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Word } from '../../models/marker';

@Injectable()
export class WordSearchService {
  private wordsUrl = 'http://localhost:8080/api/words';

  constructor(private http: Http) { }

  search(term: string): Observable<Word[]> {
    return this.http
      .get(this.wordsUrl + `/?name=${term}`)
      .map((r: Response) => r.json().data as Word[])
      .catch((error: any) => {
          console.error('An friendly error occurred', error);
          return Observable.throw(error.message || error);
      });
  }
}
