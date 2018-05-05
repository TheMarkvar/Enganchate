import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedservicespageComponent } from './purchasedservicespage.component';

describe('PurchasedservicespageComponent', () => {
  let component: PurchasedservicespageComponent;
  let fixture: ComponentFixture<PurchasedservicespageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasedservicespageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedservicespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
