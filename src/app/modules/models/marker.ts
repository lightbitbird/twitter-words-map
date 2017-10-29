/**
 * Created by SeungEun on 2017/02/04.
 */
export class Marker {
  placeId: number;
  lat: number;
  lng: number;
  place?: string;
  label?: string;
  words: Word[];
  total: number;
  // draggable: boolean;
}

export class Word {
  id: number;
  placeId: number;
  name: string;
  country_code: string;
  place: string;
  count: number;
}
