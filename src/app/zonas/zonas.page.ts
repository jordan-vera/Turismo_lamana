import { Component, OnInit } from '@angular/core';
import { Data } from '../data';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.page.html',
  styleUrls: ['./zonas.page.scss'],
})
export class ZonasPage implements OnInit {

  public zonas: any[];
  public imagenes: any[];

  public buscadortxt = '';

  constructor() { 
    this.zonas = Data.zonas;
    this.imagenes = Data.imagenes;
  }

  ngOnInit() {
  }

  getImagen(idzona): string {
    var nombreImagen = "";
    for (let i = 0; i < this.imagenes.length; i++) {
      if (this.imagenes[i].idzonas == idzona) {
        nombreImagen = this.imagenes[i].nombre;
      }
    }
    return nombreImagen;
  }

  salir(): void {
    navigator['app'].exitApp();
  }

}
