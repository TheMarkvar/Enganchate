import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivadopageComponent } from './privadopage.component';

describe('PrivadopageComponent', () => {
  let component: PrivadopageComponent;
  let fixture: ComponentFixture<PrivadopageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivadopageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivadopageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
