import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarVoluntarioComponent } from './agregar-voluntario.component';

describe('AgregarVoluntarioComponent', () => {
  let component: AgregarVoluntarioComponent;
  let fixture: ComponentFixture<AgregarVoluntarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarVoluntarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
