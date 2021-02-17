import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZonaDetallePageRoutingModule } from './zona-detalle-routing.module';

import { ZonaDetallePage } from './zona-detalle.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZonaDetallePageRoutingModule,
  ],
  declarations: [ZonaDetallePage]
})
export class ZonaDetallePageModule {}
