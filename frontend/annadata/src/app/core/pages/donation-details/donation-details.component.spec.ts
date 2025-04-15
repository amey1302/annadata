import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationDetailsComponent } from './donation-details.component';

describe('DonationDetailsComponent', () => {
  let component: DonationDetailsComponent;
  let fixture: ComponentFixture<DonationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
