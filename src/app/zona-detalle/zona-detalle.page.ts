import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { take } from 'rxjs/operators';
import { Data } from '../data';

declare var google;

@Component({
  selector: 'app-zona-detalle',
  templateUrl: './zona-detalle.page.html',
  styleUrls: ['./zona-detalle.page.scss'],
})
export class ZonaDetallePage implements OnInit {
  @ViewChild('mapaenvio') mapElement: ElementRef;
  public distancia;

  //mapa
  map: any;
  directionsService: any = null;
  directionsDisplay: any = null;
  bounds: any = null;
  myLatLng: any;
  waypoints: any[];
  public posicion: any;

  public zonas: any[];
  public imagenes: any[];
  public idzona: number = 1;
  public ubicaciones: any[];
  public gastronomia: any[];

  constructor(
    private readonly _geolocation$: GeolocationService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.bounds = new google.maps.LatLngBounds();
    this.waypoints = [];

    this.zonas = Data.zonas;
    this.imagenes = Data.imagenesGaleria;
    this.ubicaciones = Data.ubicacion;
    this.gastronomia = Data.gastronomia;

    this._route.params.subscribe((params: Params) => {
      this.idzona = params.idzona - 1;
    });
  }

  ngOnInit() {

  }

  filterItemsOfType(idzonas) {
    return this.gastronomia.filter(x => x.idzonas == idzonas);
  }

  filterItemsOfId(idzonas) {
    return this.imagenes.filter(x => x.idzonas == idzonas);
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.obtenerLocalizacion();
    }, 1000)
  }

  irAtras(): void {
    this._router.navigate(['/zonas']);
  }

  obtenerLocalizacion(): void {
    this._geolocation$.pipe(take(1)).subscribe(
      position => {
        this.posicion = position;
        this.waypoints.push({
          location: { lat: this.posicion.coords.latitude, lng: this.posicion.coords.longitude },
          stopover: true,
        });
        this.loadMap(this.ubicaciones[this.idzona].latitud, this.ubicaciones[this.idzona].longitud)
      });
  }

  loadMap(latitude: number, longitude: number) {
    let mapEle: HTMLElement = this.mapElement.nativeElement;
    this.myLatLng = { lat: latitude, lng: longitude };
    this.map = new google.maps.Map(mapEle, {
      center: this.myLatLng,
      zoom: 6
    });

    this.directionsDisplay.setMap(this.map);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });
  }

  private calculateRoute() {
    this.bounds.extend(this.myLatLng);
    this.waypoints.forEach(waypoint => {
      var point = new google.maps.LatLng(waypoint.location.lat, waypoint.location.lng);
      this.bounds.extend(point);
    });

    this.map.fitBounds(this.bounds);

    this.directionsService.route({
      origin: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
      destination: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
      waypoints: this.waypoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
      avoidTolls: true
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
        this.distancia = response.routes[0].legs[0].distance.value;

      } else {
        console.log('Could not display directions due to: -------------');
      }
    });
  }

}
