import { Injectable } from '@angular/core';


@Injectable()
export class WinService {

  private readonly _WIN_SCORE: number = 21;


  public getWinner(humanScore: number, computerScore: number): TResult['winner'] {
    if (computerScore === humanScore) {
      return 'Nobody wins. Equal scores';
    }

    if (humanScore === this._WIN_SCORE) {
      return 'Winner: You';
    }

    if (computerScore === this._WIN_SCORE || humanScore > this._WIN_SCORE) {
      return 'Winner: Dealer';
    }

    if (computerScore > this._WIN_SCORE && humanScore < computerScore){
      return 'Winner: You';
    }

    if (humanScore < this._WIN_SCORE && computerScore > humanScore){
      return 'Winner: Dealer';
    }

    if (humanScore < this._WIN_SCORE && computerScore < humanScore){
      return 'Winner: You';
    }

    return;
  }
}
