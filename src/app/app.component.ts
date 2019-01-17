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
  public title: string = 'BJ-Ang';
  public deck: TCard[] = [];

  public humanPlayerHand: TCard[] = [];
  public computerPlayerHand: TCard[] = [];

  public humanScore: number = 0;
  public computerScore: number = 0;

  public readonly SWAP_TIMES: number = 36;
  public readonly WIN_SCORE: number = 21;
  public readonly ENOUGH_SCORE: number = 15;

  public winner: string;

  public isButtonVisible: boolean = false;
  public isShown: boolean = false;

  public constructor() {
    this.generateDeck();
  }

  private generateDeck(): void {
    const cardNameCollection: string[] = ['Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace'];
    const suitsNameCollection: string[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const valueCollection: number[] = [6, 7, 8, 9, 10, 2, 3, 4, 11];

    for (let i: number = 0; i < suitsNameCollection.length; i++) {

      for (let j: number = 0; j < cardNameCollection.length; j++) {
        const cardName: string = cardNameCollection[j];
        const cardSuit: string = suitsNameCollection[i];
        const cardValue: number = valueCollection[j];

        const createdCard: TCard = this._getCard(cardName, cardSuit, cardValue);
        this.deck.push(createdCard);
      }
    }
  }

  private _getCard(name: string, suit: string, value: number): TCard {
    return {
      name,
      suit,
      value,
    };
  }

  private shuffleDeck(deck: TCard[]): void {

    for (let indexSwap: number = 0; indexSwap < this.SWAP_TIMES; indexSwap++) {
      const firstIndex: number = Math.floor(Math.random() * (this.deck.length));
      const secondIndex: number = Math.floor(Math.random() * (this.deck.length));

      if (firstIndex === secondIndex) {
        indexSwap--;
        continue;
      }
      const temp: TCard = this.deck[firstIndex];
      this.deck[firstIndex] = this.deck[secondIndex];
      this.deck[secondIndex] = temp;
    }

  }

  public newGame(): void {
    this.isButtonVisible = true;
    this.humanScore = 0;
    this.computerScore = 0;

    this.deck = this.deck.concat(this.humanPlayerHand, this.computerPlayerHand);
    this.humanPlayerHand = [];
    this.computerPlayerHand = [];
    this.shuffleDeck(this.deck);

    this.humanPlayerHand.push(this.deck.pop());
    this.humanScore += this.humanPlayerHand[this.humanPlayerHand.length - 1].value;
    this.computerPlayerHand.push(this.deck.pop());
    this.computerScore += this.computerPlayerHand[this.computerPlayerHand.length - 1].value;
  }

  public onHit(): void {
    this.humanPlayerHand.push(this.deck.pop());
    this.humanScore += this.humanPlayerHand[this.humanPlayerHand.length - 1].value;

    if (this.humanScore > this.WIN_SCORE) {
      this.winner = 'Dealer';
      this.isButtonVisible = false;
    } else if (this.humanScore === this.WIN_SCORE) {
      this.winner = 'You';
      this.isButtonVisible = false;
    }
  }

  public onStand(): void {
    this.isButtonVisible = false;

    while (this.computerScore <= this.ENOUGH_SCORE && this.computerScore !== this.WIN_SCORE) {
      this.computerPlayerHand.push(this.deck.pop());
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
}
