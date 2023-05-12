import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }
  login() {
    this.authService.signIn(this.loginForm.value).subscribe((res) => {
      if (res) {
        this.authService.role = res.role;
        switch (res.role) {
          case 'admin':
            this.router.navigate(['admin']);
            break;
          case 'user':
            this.router.navigate(['dashboard']);
            break;
          case 'coach':
            this.router.navigate(['coach']);
            break;
          default:
            this.router.navigate(['']);
        }
      }
    });
  }
}
