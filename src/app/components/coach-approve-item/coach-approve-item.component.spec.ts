import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachApproveItemComponent } from './coach-approve-item.component';

describe('CoachApproveItemComponent', () => {
  let component: CoachApproveItemComponent;
  let fixture: ComponentFixture<CoachApproveItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachApproveItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachApproveItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
