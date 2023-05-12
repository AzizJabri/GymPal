import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Input } from '@angular/core';
import { CoachService } from 'src/app/shared/services/coach.service';

@Component({
  selector: 'app-coach-approve-item',
  templateUrl: './coach-approve-item.component.html',
  styleUrls: ['./coach-approve-item.component.scss'],
})
export class CoachApproveItemComponent {
  @Input() coach: any;

  constructor(private service: CoachService) {}

  approveCoach(id: any) {
    this.service.approveCoach(id);
  }
  rejectCoach(id: any) {
    this.service.removeCoach(id);
  }
}
