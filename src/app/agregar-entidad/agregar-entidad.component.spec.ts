import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEntidadComponent } from './agregar-entidad.component';

describe('AgregarEntidadComponent', () => {
  let component: AgregarEntidadComponent;
  let fixture: ComponentFixture<AgregarEntidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEntidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
