import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})

export class SideBarComponent implements OnInit {

  @Output()
  public newGame = new EventEmitter<void>();
  public newGameChld(){
  this.newGame.emit();
  }


  constructor() { }

  ngOnInit() {
  }

}
