import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  public center = { lat: -1.0019363883009038, lng: -79.2388916015625 };
  markerOptions = { draggable: true };
  markerPositions: google.maps.LatLngLiteral[] = [];
  public zoom = 14;
  display?: google.maps.LatLngLiteral;
  public posicion: any = '';
  public datos = [];

  constructor(
    private readonly _geolocation$: GeolocationService,
  ) { }

  ngOnInit() {
    //this.obtenerLocalizacion();
  }

  obtenerLocalizacion(): void {
    this._geolocation$.pipe(take(1)).subscribe(
      position => {
        this.posicion = position;
        this.markerPositions = [];
        this.datos = []
        this.center = { lat: this.posicion.coords.latitude, lng: this.posicion.coords.longitude };
        this.datos.push({ lat: this.posicion.coords.latitude, lng: this.posicion.coords.longitude })
        this.markerPositions.push(this.datos[0]);
        this.zoom = 14;
      },
      error => {
        console.log(error);
      });
  }

  addMarker(event: google.maps.MouseEvent) {
    this.markerPositions = [];
    this.markerPositions.push(event.latLng.toJSON());
    console.log(event.latLng.toJSON())
  }

  move(event: google.maps.MouseEvent) {
    this.display = event.latLng.toJSON();
  }

  removeLastMarker() {
    this.markerPositions.pop();
  }

}
