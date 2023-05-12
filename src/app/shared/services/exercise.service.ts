import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  exercises: any = [];
  constructor(private api: HttpClient) {
    this.fetchExercises();
  }

  getAllExercises(): Observable<any> {
    return this.api.get('http://localhost/api/exercises/getAll.php');
  }

  fetchExercises(): void {
    this.getAllExercises().subscribe(
      (exercises) => {
        this.exercises = exercises;
      },
      (error) => {
        console.error('Failed to fetch exercises:', error);
      }
    );
  }

  removeExercise(id: any) {
    this.api
      .get('http://localhost/api/exercises/deleteById.php?id=' + id)
      .subscribe((data: any) => {
        //destroy this component
        this.fetchExercises();
      });
  }

  addExercise(exercise: any) {
    this.api
      .post('http://localhost/api/exercises/create.php', exercise)
      .subscribe((data: any) => {
        this.fetchExercises();
      });
  }
}
