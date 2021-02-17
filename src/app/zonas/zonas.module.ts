import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZonasPageRoutingModule } from './zonas-routing.module';

import { ZonasPage } from './zonas.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZonasPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ZonasPage]
})
export class ZonasPageModule {}
