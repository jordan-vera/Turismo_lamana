import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ZonaDetallePage } from './zona-detalle.page';

describe('ZonaDetallePage', () => {
  let component: ZonaDetallePage;
  let fixture: ComponentFixture<ZonaDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonaDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ZonaDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
