import { Component, OnInit } from '@angular/core';
import { DeckService } from '../services/deck.service';

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
  private _deckService: DeckService;


  public constructor(deckService: DeckService) {
    this._deckService = deckService;
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
  }

  public onHit(): void {
    this.playerHands.humanPlayerHand.push(this._deck.pop());
    this.result.humanScore += this.playerHands.humanPlayerHand[this.playerHands.humanPlayerHand.length - 1].value;

    if (this.result.humanScore > this._WIN_SCORE) {
      this.result.winner = 'Winner: Dealer';
      this.result.isShownButtons = false;

      return;
    }

    if (this.result.humanScore === this._WIN_SCORE) {
      this.result.winner = 'Winner: You';
      this.result.isShownButtons = false;
    }
  }

  public onStand(): void {
    this.result.isShownButtons = false;

    recheck: while (this.result.computerScore <= this._ENOUGH_SCORE && this.result.computerScore !== this._WIN_SCORE) {
      this.playerHands.computerPlayerHand.push(this._deck.pop());
      this.result.computerScore += this.playerHands.computerPlayerHand[this.playerHands.computerPlayerHand.length - 1].value;

      if (this.result.computerScore > this._WIN_SCORE || this.result.computerScore < this.result.humanScore) {
        this.result.winner = 'Winner: You';

        continue recheck;
      }

      if (this.result.computerScore === this._WIN_SCORE || this.result.computerScore > this.result.humanScore) {
        this.result.winner = 'Winner: Dealer';
      }

      if (this.result.computerScore === this.result.humanScore) {
        this.result.winner = 'Nobody wins. Equal scores';
      }
    }
  }

  public ngOnInit(): void {
    this._deck = this._deckService.getDeck();
  }
}