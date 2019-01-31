import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeckService {


  private readonly _SWAP_TIMES: number = 36;

  private _deck: TCard[] = [];


  public constructor() {
    this._generateDeck();
  }

  public getDeck() {
    this._deck = this._shuffleDeck(this._deck);
    return this._deck;
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