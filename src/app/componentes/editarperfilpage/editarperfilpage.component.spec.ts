import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarperfilpageComponent } from './editarperfilpage.component';

describe('EditarperfilpageComponent', () => {
  let component: EditarperfilpageComponent;
  let fixture: ComponentFixture<EditarperfilpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarperfilpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarperfilpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
