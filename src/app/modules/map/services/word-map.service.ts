/**
 * Created by SeungEun on 2017/02/04.
 */
import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions, Jsonp, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import {Marker, Word} from '../../models/marker';

@Injectable()
export class WordMapService {
  private wMapUrl = 'http://localhost:8080/api/words-map';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {}

  getWordsMap(): Observable<Marker[]> {
    console.log("wMapUrl => " + this.wMapUrl);

    /**
    function toMarkers(res:any): Marker[] {
      let markers: Marker[] = [];
      for (let i in res) {
        let marker = <Marker>({
          placeId: res[i].placeId,
          lat: res[i].lat,
          lng: res[i].lng,
          place: res[i].place,
          label: res[i].label,
          words: res[i].words,
          total: res[i].total,
        });
        console.log('Parsed marker:', marker);
        markers.push(marker)
      }
      return markers;
    }
     **/

    return this.http.get(this.wMapUrl)
      .map((response: Response) => {
        console.log(response.json());
        return response.json() as Marker
      })
      .catch(this.handleError);
  }

  getWordMap(id: number): Observable<Marker> {

    // let params = new URLSearchParams();
    // params.set('id', id.toString());

    return this.http.get(this.wMapUrl + "/" + id)
      .map((response: Response) => {
        console.log(response);
        console.log(response.json());
        console.log(response.json().data);
        toMarker(response.json());
      })
      .catch(this.handleError)

    function toMarker(res:any): Marker {
      let marker = <Marker>({
        placeId: res.placeId,
        lat: res.lat,
        lng: res.lng,
        place: res.place,
        label: res.label,
        words: res.words,
        total: res.total,
      });
      console.log('Parsed marker:', marker);
      return marker;
    }
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message : (error.status ? `${error.status} - ${error.statusText}` : 'Server error');
    console.log(error); // log to console instead
    console.error('An error occurred', errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
