import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  host: { class: 'side-bar' },
})

export class SideBarComponent implements OnInit {

  @Input() public isShown: boolean; 
  @Input() public winner: string;
  @Input() public humanScore: number;
  @Input() public computerScore: number;

  @Output()
  public newGame_did = new EventEmitter<void>();
  public newGame_do(){
  this.newGame_did.emit();
  }

  @Output()
  public onHit_did = new EventEmitter<void>();
  public onHit_do(){
  this.onHit_did.emit();
  }

  @Output()
  public onStand_did = new EventEmitter<void>();
  public onStand_do(){
  this.onStand_did.emit();
  }

  constructor() {

  }

  ngOnInit() {

  }

}
