import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPaseoComponent } from './agregar-paseo.component';

describe('AgregarPaseoComponent', () => {
  let component: AgregarPaseoComponent;
  let fixture: ComponentFixture<AgregarPaseoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarPaseoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPaseoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
