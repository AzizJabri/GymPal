import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  constructor() {}
  @Input() title = 'angular-frontend';

  @Input() description = 'Angular frontend for the project';

  @Input() href = 'users';
}
