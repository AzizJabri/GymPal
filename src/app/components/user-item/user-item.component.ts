import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent {
  @Input() user: any;
  constructor(public service: UserService) {}
  deleteUser(id: any) {
    this.service.removeUser(id);
  }
}
