import { Component, Input } from '@angular/core';

@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  host: {class: 'game-field'},
})

export class FieldComponent {

  @Input() public playerHands: TPlayerHands;

}
