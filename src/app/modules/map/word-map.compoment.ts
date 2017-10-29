/**
 * Created by SeungEun on 2017/01/29.
 */
import {Component, OnInit} from '@angular/core';
import {Jsonp, JsonpModule} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MouseEvent } from 'angular2-google-maps/core/map-types';
import {Marker, Word} from "../models/marker";
import { WordMapService } from "./services/word-map.service";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'word-map',
  templateUrl: '../../html/map/word-map.component.html',
  styles: [`
    .sebm-google-map-container {
       height: 600px;
     }
  `],
  providers: [WordMapService]
})

export class WordMapComponent implements OnInit {
  //google maps zoom level
  zoom: number = 8;
  //initial center position for the map
  lat: number = 34.687428;
  lng: number = 135.483398;

  // lat: number = 51.678418;
  // lng: number = 7.809007;
  title: string = 'angular2-google-maps';
  // markers: Marker[] = [];

  constructor(
    private wordMapService: WordMapService) {
  }

  ngOnInit(): void {
    this.wordMapService.getWordsMap()
      .subscribe ( markers => {
        console.log(markers);
        this.markers = markers
      }, error => console.log(error));
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    console.log($event.coords);
    this.markers.push(<Marker>{
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      place: 'D',
      words: [<Word>{id: 1, name: "Germany1", count: 10}, <Word>{id: 2, name: "Germany2", count: 20}, <Word>{id: 3, name: "Germany3", count: 20}],
      total: 21
    });
    console.log(this.markers);
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event)
  }

  markers: Marker[] = [
    {
      placeId: 1,
      lat: 51.673858,
      lng: 7.815982,
      place: 'A',
      label: 'A',
      words: [<Word>{id: 1, name: "Hello1", count: 10}, <Word>{id: 2, name: "Hello2", count: 20}, <Word>{id: 3, name: "Hello3", count: 20}],
      total: 100
    },
    {
      placeId: 2,
      lat: 51.373858,
      lng: 7.215982,
      place: 'B',
      label: 'B',
      words: [<Word>{id: 2, name: "Hello2", count: 20}],
      total: 200
    },
    {
      placeId: 3,
      lat: 51.723858,
      lng: 7.895982,
      place: 'C',
      label: 'C',
      words: [<Word>{id: 3, name: "Hello3", count: 30}],
      total: 300
    }
  ]
}

// interface marker {
//   lat: number;
//   lng: number;
//   label?: string;
//   draggable: boolean;
// }

