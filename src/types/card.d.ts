type TCard = {
    name: string;
    suit: string;
    value: number;
    imageSource: string;
};

type TResult = {
    isShownButtons: boolean;
    winner: string;
    humanScore: number;
    computerScore: number;
};

type TPlayerHands = {
    humanPlayerHand: TCard[];
    computerPlayerHand: TCard[];
}