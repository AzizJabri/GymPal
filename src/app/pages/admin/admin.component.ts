import { Component } from '@angular/core';
import { CoachService } from 'src/app/shared/services/coach.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor(
    public coachService: CoachService,
    public userService: UserService
  ) {}

  getNbCoaches() {
    return this.coachService.coachList.filter(
      (coach: any) => coach.isApproved === '1'
    ).length;
  }
  getNbCoachesPending() {
    return this.coachService.coachList.filter(
      (coach: any) => coach.isApproved === '0'
    ).length;
  }
  getNbUsers() {
    return this.userService.usersList.length;
  }
}
