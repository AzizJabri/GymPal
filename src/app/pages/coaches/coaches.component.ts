import { Component } from '@angular/core';
import { CoachService } from 'src/app/shared/services/coach.service';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss'],
})
export class CoachesComponent {
  constructor(private service: CoachService) {}
}
