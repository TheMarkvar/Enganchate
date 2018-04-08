import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishservicepageComponent } from './publishservicepage.component';

describe('PublishservicepageComponent', () => {
  let component: PublishservicepageComponent;
  let fixture: ComponentFixture<PublishservicepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishservicepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishservicepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
