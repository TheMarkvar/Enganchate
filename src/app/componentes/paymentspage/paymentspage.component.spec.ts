import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentspageComponent } from './paymentspage.component';

describe('PaymentspageComponent', () => {
  let component: PaymentspageComponent;
  let fixture: ComponentFixture<PaymentspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
