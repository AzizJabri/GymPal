import { Component } from '@angular/core';
import { CoachService } from 'src/app/shared/services/coach.service';

@Component({
  selector: 'app-coaches-list',
  templateUrl: './coaches-list.component.html',
  styleUrls: ['./coaches-list.component.scss'],
})
export class CoachesListComponent {
  filterText: string = '';

  constructor(public service: CoachService) {}
}
