import { Component, Input } from '@angular/core';
import { ExerciseService } from 'src/app/shared/services/exercise.service';

@Component({
  selector: 'app-exercise-item',
  templateUrl: './exercise-item.component.html',
  styleUrls: ['./exercise-item.component.scss'],
})
export class ExerciseItemComponent {
  @Input() exercise: any;

  constructor(public service: ExerciseService) {}

  deleteExercise(id: any) {
    this.service.removeExercise(id);
  }
}
