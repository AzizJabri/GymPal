import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Input } from '@angular/core';
import { CoachService } from 'src/app/shared/services/coach.service';

@Component({
  selector: 'app-coach-item',
  templateUrl: './coach-item.component.html',
  styleUrls: ['./coach-item.component.scss'],
})
export class CoachItemComponent {
  constructor(private service: CoachService) {}
  @Input() coach: any;

  deleteCoach(id: any) {
    this.service.removeCoach(id);
  }
}
