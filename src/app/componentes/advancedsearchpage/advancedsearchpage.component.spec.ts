import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedsearchpageComponent } from './advancedsearchpage.component';

describe('AdvancedsearchpageComponent', () => {
  let component: AdvancedsearchpageComponent;
  let fixture: ComponentFixture<AdvancedsearchpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedsearchpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedsearchpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
