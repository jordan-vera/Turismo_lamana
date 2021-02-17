import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ZonasPage } from './zonas.page';

describe('ZonasPage', () => {
  let component: ZonasPage;
  let fixture: ComponentFixture<ZonasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ZonasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
