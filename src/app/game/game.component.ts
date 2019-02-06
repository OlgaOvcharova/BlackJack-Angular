import { Component, OnInit } from '@angular/core';
import { DeckService } from '../services/deck.service';
import { WinService } from '../services/win.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public result: TResult = {
      isShownButtons: false,
      winner: '',
      humanScore: 0,
      computerScore: 0
  };

  public playerHands: TPlayerHands = {
    humanPlayerHand: [],
    computerPlayerHand: []
  };


  private readonly _WIN_SCORE: number = 21;
  private readonly _ENOUGH_SCORE: number = 15;

  private _deck: TCard[];


  public constructor(
    private _deckService: DeckService,
    private _winService: WinService
  ) {}

  public ngOnInit(): void {
    this._deck = this._deckService.getDeck();
  }

  public newGame(): void {
    this.result.isShownButtons = true;
    this.result.winner = '';
    this.result.humanScore = 0;
    this.result.computerScore = 0;

    this._deck = this._deck.concat(this.playerHands.humanPlayerHand, this.playerHands.computerPlayerHand);
    this.playerHands.humanPlayerHand = [];
    this.playerHands.computerPlayerHand = [];

    this.playerHands.humanPlayerHand.push(this._deck.pop());
    this.result.humanScore += this.playerHands.humanPlayerHand[this.playerHands.humanPlayerHand.length - 1].value;
    this.playerHands.computerPlayerHand.push(this._deck.pop());
    this.result.computerScore += this.playerHands.computerPlayerHand[this.playerHands.computerPlayerHand.length - 1].value;
    this.result.isShownButtons = true;
  }

  public onHit(): void {
    while (this.result.humanScore <= this._WIN_SCORE) {
      this.playerHands.humanPlayerHand.push(this._deck.pop());
      this.result.humanScore += this.playerHands.humanPlayerHand[this.playerHands.humanPlayerHand.length - 1].value;

      return;
    }
  }

  public onStand(): void {
    this.result.isShownButtons = false;

    while (this.result.computerScore <= this._ENOUGH_SCORE) {
      this.playerHands.computerPlayerHand.push(this._deck.pop());
      this.result.computerScore += this.playerHands.computerPlayerHand[this.playerHands.computerPlayerHand.length - 1].value;
    }

    this.result.winner = this._winService.getWinner(this.result.humanScore, this.result.computerScore);
  }
}