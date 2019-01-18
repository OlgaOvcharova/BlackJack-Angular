import { Component } from '@angular/core';

type TCard = {
  name: string;
  suit: string;
  value: number;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public readonly SWAP_TIMES: number = 36;
  public readonly WIN_SCORE: number = 21;
  public readonly ENOUGH_SCORE: number = 15;


  public humanPlayerHand: TCard[] = [];
  public computerPlayerHand: TCard[] = [];
  public humanScore: number = 0;
  public computerScore: number = 0;
  public winner: string;
  public isShown: boolean = false;


  private _deck: TCard[] = [];
 
  
  public constructor() {
    this._generateDeck();
  }

  public newGame(): void {
    this.isShown = true;
    this.humanScore = 0;
    this.computerScore = 0;

    this._deck = this._deck.concat(this.humanPlayerHand, this.computerPlayerHand);
    this.humanPlayerHand = [];
    this.computerPlayerHand = [];
    this._deck = this._shuffleDeck(this._deck);

    this.humanPlayerHand.push(this._deck.pop());
    this.humanScore += this.humanPlayerHand[this.humanPlayerHand.length - 1].value;
    this.computerPlayerHand.push(this._deck.pop());
    this.computerScore += this.computerPlayerHand[this.computerPlayerHand.length - 1].value;
  }

  public onHit(): void {
    this.humanPlayerHand.push(this._deck.pop());
    this.humanScore += this.humanPlayerHand[this.humanPlayerHand.length - 1].value;

    if (this.humanScore > this.WIN_SCORE) {
      this.winner = 'Dealer';
      this.isShown = false;
    } else if (this.humanScore === this.WIN_SCORE) {
      this.winner = 'You';
      this.isShown = false;
    }
  }

  public onStand(): void {
    this.isShown = false;

    while (this.computerScore <= this.ENOUGH_SCORE && this.computerScore !== this.WIN_SCORE) {
      this.computerPlayerHand.push(this._deck.pop());
      this.computerScore += this.computerPlayerHand[this.computerPlayerHand.length - 1].value;
      if (this.computerScore > this.WIN_SCORE || this.computerScore < this.humanScore) {
        this.winner = 'You';
      } else if (this.computerScore === this.WIN_SCORE || this.computerScore > this.humanScore) {
        this.winner = 'Dealer';
      } else if (this.computerScore === this.humanScore) {
        this.winner = 'Eqal scores';
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
    };
  }

  private _shuffleDeck(deck: TCard[]): TCard[] {

    for (let indexSwap: number = 0; indexSwap < this.SWAP_TIMES; indexSwap++) {
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
