import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private router: Router, public auth: AuthService) {}

  getCurrentRoute() {
    return this.router.url;
  }

  getRole() {
    return this.auth.getRole();
  }
}
