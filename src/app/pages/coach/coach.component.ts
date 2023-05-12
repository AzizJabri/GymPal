import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss'],
})
export class CoachComponent {
  coachForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {
    this.coachForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      experience: ['', [Validators.required]],
    });
  }

  register() {
    this.authService
      .signUpCoach({
        email: this.coachForm.value.email,
        password: this.coachForm.value.password,
        confirmPassword: this.coachForm.value.confirmPassword,
        firstName: this.coachForm.value.firstName,
        lastName: this.coachForm.value.lastName,
        experience: this.coachForm.value.experience,
        role: 'coach',
      })
      .subscribe((res) => {
        if (res) {
          this.router.navigate(['/auth/login']);
        }
      });
  }
}
