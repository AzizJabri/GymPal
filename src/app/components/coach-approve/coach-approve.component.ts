import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Input } from '@angular/core';
import { CoachService } from 'src/app/shared/services/coach.service';

@Component({
  selector: 'app-coach-approve',
  templateUrl: './coach-approve.component.html',
  styleUrls: ['./coach-approve.component.scss'],
})
export class CoachApproveComponent {
  filterText: string = '';
  constructor(public service: CoachService) {}
}
