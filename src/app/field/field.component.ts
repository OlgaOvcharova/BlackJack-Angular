import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  host: {class: 'game-field'},
})
export class FieldComponent implements OnInit {

  @Input() public humanScore: number;
  @Input() public computerScore: number;
  @Input() public humanPlayerHand: TCard[] = [];
  @Input() public computerPlayerHand: TCard[] = [];

  constructor() { }

  ngOnInit() {
  }

}
