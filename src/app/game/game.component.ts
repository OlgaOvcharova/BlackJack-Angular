import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

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


  private readonly _SWAP_TIMES: number = 36;
  private readonly _WIN_SCORE: number = 21;
  private readonly _ENOUGH_SCORE: number = 15;

  private _deck: TCard[] = [];


  public constructor() {
    this._generateDeck();
  }

  public newGame(): void {
    this.result.isShownButtons = true;
    this.result.winner = '';
    this.result.humanScore = 0;
    this.result.computerScore = 0;

    this._deck = this._deck.concat(this.playerHands.humanPlayerHand, this.playerHands.computerPlayerHand);
    this.playerHands.humanPlayerHand = [];
    this.playerHands.computerPlayerHand = [];
    this._deck = this._shuffleDeck(this._deck);

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

    while (this.result.computerScore <= this._ENOUGH_SCORE && this.result.computerScore !== this._WIN_SCORE) {
      this.playerHands.computerPlayerHand.push(this._deck.pop());
      this.result.computerScore += this.playerHands.computerPlayerHand[this.playerHands.computerPlayerHand.length - 1].value;
      
      if (this.result.computerScore > this._WIN_SCORE || this.result.computerScore < this.result.humanScore) {
        this.result.winner = 'Winner: You';
      }

      if (this.result.computerScore === this._WIN_SCORE || this.result.computerScore > this.result.humanScore) {
        this.result.winner = 'Winner: Dealer';
      }      

      if (this.result.computerScore === this.result.humanScore) {
        this.result.winner = 'Nobody wins. Equal scores';
      }

    }
  }


  private _generateDeck(): void {
    const cardNameCollection: string[] = ['Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace'];
    const suitsNameCollection: string[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const valueCollection: number[] = [6, 7, 8, 9, 10, 2, 3, 4, 11];

    suitsNameCollection.forEach((cardSuit: string) => {
      cardNameCollection.forEach((cardName: string, index: number) => {
        this._deck.push(this._getCard(cardName, cardSuit, valueCollection[index]));
      });
    });
  }

  private _getCard(name: string, suit: string, value: number): TCard {
    return {
      name,
      suit,
      value,
      imageSource: `../assets/cards/${suit}/${name}.jpg`
    };
  }

  private _shuffleDeck(deck: TCard[]): TCard[] {
    for (let indexSwap: number = 0; indexSwap < this._SWAP_TIMES; indexSwap++) {

      const firstIndex: number = Math.floor(Math.random() * (this._deck.length));
      const secondIndex: number = Math.floor(Math.random() * (this._deck.length));

      if (firstIndex === secondIndex) {
        indexSwap--;
        continue;
      }

      const temp: TCard = deck[firstIndex];
      deck[firstIndex] = deck[secondIndex];
      deck[secondIndex] = temp;
    }

    return deck;
  }
}
