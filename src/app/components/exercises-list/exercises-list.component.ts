import { Component } from '@angular/core';
import { ExerciseService } from 'src/app/shared/services/exercise.service';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.scss'],
})
export class ExercisesListComponent {
  filterText: string = '';
  constructor(public service: ExerciseService) {}
}
