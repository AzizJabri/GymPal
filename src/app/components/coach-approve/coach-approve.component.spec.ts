import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachApproveComponent } from './coach-approve.component';

describe('CoachApproveComponent', () => {
  let component: CoachApproveComponent;
  let fixture: ComponentFixture<CoachApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
