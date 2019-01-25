import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  private _deck: TCard[] = [];
  
  
  public resultToSideBar: TResultToSideBar = {
    isShownButtons : false,
    winner: '',
    humanScore: 0,
    computerScore: 0
  }
  
  public playerHands: TPlayerHands = {
    humanPlayerHand: [],
    computerPlayerHand: []
  }
  
  
  private readonly SWAP_TIMES: number = 36;
  private readonly WIN_SCORE: number = 21;
  private readonly ENOUGH_SCORE: number = 15;


  public constructor() {
    this._generateDeck();
  }

  public newGame(): void {
    this.resultToSideBar.isShownButtons = true;
    this.resultToSideBar.winner = '';
    this.resultToSideBar.humanScore = 0;
    this.resultToSideBar.computerScore = 0;

    this._deck = this._deck.concat(this.playerHands.humanPlayerHand, this.playerHands.computerPlayerHand);
    this.playerHands.humanPlayerHand = [];
    this.playerHands.computerPlayerHand = [];
    this._deck = this._shuffleDeck(this._deck);

    this.playerHands.humanPlayerHand.push(this._deck.pop());
    this.resultToSideBar.humanScore += this.playerHands.humanPlayerHand[this.playerHands.humanPlayerHand.length - 1].value;
    this.playerHands.computerPlayerHand.push(this._deck.pop());
    this.resultToSideBar.computerScore += this.playerHands.computerPlayerHand[this.playerHands.computerPlayerHand.length - 1].value;
  }

  public onHit(): void {
    this.playerHands.humanPlayerHand.push(this._deck.pop());
    this.resultToSideBar.humanScore += this.playerHands.humanPlayerHand[this.playerHands.humanPlayerHand.length - 1].value;

    if (this.resultToSideBar.humanScore > this.WIN_SCORE) {
      this.resultToSideBar.winner = 'Winner: Dealer';
      this.resultToSideBar.isShownButtons = false;

      return;
    }
    
    if (this.resultToSideBar.humanScore === this.WIN_SCORE) {
      this.resultToSideBar.winner = 'Winner: You';
      this.resultToSideBar.isShownButtons = false;
    }

  }

  public onStand(): void {
    this.resultToSideBar.isShownButtons = false;

    while (this.resultToSideBar.computerScore <= this.ENOUGH_SCORE && this.resultToSideBar.computerScore !== this.WIN_SCORE) {
      this.playerHands.computerPlayerHand.push(this._deck.pop());
      this.resultToSideBar.computerScore += this.playerHands.computerPlayerHand[this.playerHands.computerPlayerHand.length - 1].value;

      if (this.resultToSideBar.computerScore > this.WIN_SCORE || this.resultToSideBar.computerScore < this.resultToSideBar.humanScore) {
        this.resultToSideBar.winner = 'Winner: You';

        return;
      }

      if (this.resultToSideBar.computerScore === this.WIN_SCORE || this.resultToSideBar.computerScore > this.resultToSideBar.humanScore) {
        this.resultToSideBar.winner = 'Winner: Dealer';

        return;
      }

      if (this.resultToSideBar.computerScore === this.resultToSideBar.humanScore) {
        this.resultToSideBar.winner = 'Nobody wins. Equal scores';
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