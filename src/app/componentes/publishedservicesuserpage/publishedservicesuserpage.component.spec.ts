import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedservicesuserpageComponent } from './publishedservicesuserpage.component';

describe('PublishedservicesuserpageComponent', () => {
  let component: PublishedservicesuserpageComponent;
  let fixture: ComponentFixture<PublishedservicesuserpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishedservicesuserpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedservicesuserpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
