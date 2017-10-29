import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Word, Marker} from '../../models/marker';
import {Observable} from "rxjs";

@Injectable()
export class WordService {
  // URL to web api
  private wordsUrl = 'http://localhost:8080/api';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {
  }

  getWords(): Observable<Marker[]> {
    let url = `${this.wordsUrl}/words`;
    return this.http.get(url)
      .map((response: Response) => response.json() as Marker)
      .catch(this.handleError);
  }

  getWord(id: number): Observable<Word> {
    let url = `${this.wordsUrl}/word/${id}`;
    return this.http.get(url)
      .map((response: Response) => response.json() as Word)
      .catch(this.handleError);
    // this.getWord(id).subscribe(markers => markers.map (
    //   marker => marker.words.map(
    //     word => words.push(word)
    //   )), error => console.log(error));
    //
    // return this.getWords().find(word => word.id === id);
  }

  save(word: Word): Promise<Word> {
    if (word.id) {
      return this.put(word);
    }
    return this.post(word);
  }

  delete(word: Word): Observable<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.wordsUrl}/word/delete/${word.id}`;

    return this.http
      .post(url, {headers: headers})
      .map((response: Response) => response.json())
      // .toPromise()
      .catch(this.handleError);
  }

  // Add a new Word
  private post(word: Word): Promise<Word> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.wordsUrl, JSON.stringify(word), {headers: headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Update an existing Word
  private put(word: Word): Promise<Word> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.wordsUrl}/word/update`;

    return this.http
      .post(url, JSON.stringify(word), {headers: headers})
      .toPromise()
      .then(() => word)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
