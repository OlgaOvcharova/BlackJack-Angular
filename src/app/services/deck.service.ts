import { Injectable } from '@angular/core';

@Injectable()
export class DeckService {

  private readonly _SWAP_TIMES: number = 36;


  public constructor() {
    this._generateDeck();
  }

  public getDeck(): TCard[] {
    return this._shuffleDeck(this._generateDeck());
  }


  private _generateDeck(): TCard[] {
    const deck: TCard[] = [];
    const cardNameCollection: string[] = ['Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace'];
    const suitsNameCollection: string[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const valueCollection: number[] = [6, 7, 8, 9, 10, 2, 3, 4, 11];

    suitsNameCollection.forEach((cardSuit: string) => {
      cardNameCollection.forEach((cardName: string, index: number) => {
        deck.push(this._getCard(cardName, cardSuit, valueCollection[index]));
      });
    });

    return deck;
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

      const firstIndex: number = Math.floor(Math.random() * (deck.length));
      const secondIndex: number = Math.floor(Math.random() * (deck.length));

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