import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNumComponent } from './customer-num.component';

describe('CustomerNumComponent', () => {
  let component: CustomerNumComponent;
  let fixture: ComponentFixture<CustomerNumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerNumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerNumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
