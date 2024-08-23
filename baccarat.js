//the function to get user input
const prompt = require("prompt-sync")();

//the basis of a deck  values and suit
const DECK_VALUES = {
  K: 0,
  Q: 0,
  J: 0,
  10: 0,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
  A: 1,
};

const SUITS = ["♥️", "♦️", "♣️", "♠️"];

// creating the deck

const createDeck = () => {
  //copy the deck into a basic array
  const deck = [];
  for (const suit of SUITS) {
    for (const [faceCard, cardValue] of Object.entries(DECK_VALUES)) {
      //we copy the value of the card face onto the deck
      deck.push({ faceCard, suit, cardValue });
    }
  }
  return deck;
};

const shuffleDeck = (deck) => {
  //copied deck
  let tempDeck = [...deck];
  const shuffleDeck = [];
  while (tempDeck.length > 0) {
    const randomIndex = Math.floor(Math.random() * tempDeck.length);
    const selectedCard = tempDeck[randomIndex];
    shuffleDeck.push(selectedCard);
    tempDeck.splice(randomIndex, 1);
  }

  return shuffleDeck;
};

const depositMoney = () => {
  while (true) {
    const depositedMoney = prompt("Enter Ammount to Deposit: ");
    const userInput = parseFloat(depositedMoney);
    if (isNaN(userInput) || userInput <= 0) {
      console.log("Invalid Deposit Please Try Again");
    } else {
      return userInput;
    }
  }
};

const choosePlayerOrBanker = () => {
  while (true) {
    const input = prompt("Player or Banker? (p/b): ");
    if (input !== "p" && input !== "b") {
      console.log("please select wither 'p' for player or 'b' for banker");
    } else {
      let returnValue = "";

      if (input === "p") {
        returnValue = "Player";
      } else {
        returnValue = "Banker";
      }

      return returnValue;
    }
  }
};

const selectBet = (playerOrBanker, balance) => {
  while (true) {
    const input = prompt("Enter your wager for " + playerOrBanker + ": ");
    const userInput = parseFloat(input);
    if (isNaN(userInput) || userInput <= 0 || userInput > balance) {
      console.log("This bet is invalid");
    } else {
      return userInput;
    }
  }
};

const playGame = (shuffledDeck, bet, playerOrBanker, balance) => {

  

    console.log("Player | Banker ");
    console.log(
      shuffledDeck[0].faceCard +
        shuffledDeck[0].suit +
        " " +
        shuffledDeck[1].faceCard +
        shuffledDeck[1].suit +
        " | " +
        shuffledDeck[2].faceCard +
        shuffledDeck[2].suit +
        " " +
        shuffledDeck[3].faceCard +
        shuffledDeck[3].suit
    );

    //player values and banker values after the natural deal
    let playerValue =
      (shuffledDeck[0].cardValue + shuffledDeck[1].cardValue) % 10;
    let bankerVAlue =
      (shuffledDeck[2].cardValue + shuffledDeck[3].cardValue) % 10;
      console.log("After Natural Turn"); 

      console.log("Player Value: " + playerValue + " Banker Value: " + bankerVAlue); 

    //both get natural 9
    if (playerValue === bankerVAlue && bankerVAlue === 9) {
      console.log("NATURAL TIE");
    }
    //player gets natural 9 or 8
    else if (
      (playerValue === 9 && bankerVAlue < 9) ||
      (playerValue === 8 && bankerVAlue < 8)
    ) {
      console.log("Player Achived Natural");
      if (playerOrBanker === "Player") {
        console.log("Player wins $" + bet * 2);
      } else {
        console.log("Banker Loses");
      }
    } else if (
      (bankerVAlue === 9 && playerValue < 9) ||
      (bankerVAlue === 8 && playerValue < 8)
    ) {
      console.log("Banker Achived Natural");
      if (playerOrBanker === "Banker") {
        console.log("Banker wins $" + bet * 1.95);
      } else {
        console.log("Player Loses");
      }
    }

     //         If the banker total is 2 or less, they draw a third card regardless of what the player's third card is.
    // If the banker total is 3, they draw a third card unless the player's third card is an 8.
    // If the banker total is 4, they draw a third card if the player's third card is 2, 3, 4, 5, 6, or 7.
    // If the banker total is 5, they draw a third card if the player's third card is 4, 5, 6, or 7.
    // If the banker total is 6, they draw a third card if the player's third card is a 6 or 7.
    // If the banker total is 7, they stand
    if (playerValue < 6) {
      console.log("Player HITS");
      console.log(
        shuffledDeck[0].faceCard +
          shuffledDeck[0].suit +
          " " +
          shuffledDeck[1].faceCard +
          shuffledDeck[1].suit +
          " " +
          shuffledDeck[4].faceCard +
          shuffledDeck[4].suit +
          " | " +
          shuffledDeck[2].faceCard +
          shuffledDeck[2].suit +
          " " +
          shuffledDeck[3].faceCard +
          shuffledDeck[3].suit +
          " " +
          shuffledDeck[5].faceCard +
          shuffledDeck[5].suit
      );
      playerValue += shuffledDeck[4].cardValue;
      const thirdCard = shuffledDeck[4];
      playerValue = playerValue % 10;

      if (bankerVAlue === 2) {
        console.log("Banker HITS");
        console.log(
          shuffledDeck[0].faceCard +
            shuffledDeck[0].suit +
            " " +
            shuffledDeck[1].faceCard +
            shuffledDeck[1].suit +
            " " +
            shuffledDeck[4].faceCard +
            shuffledDeck[4].suit +
            " | " +
            shuffledDeck[2].faceCard +
            shuffledDeck[2].suit +
            " " +
            shuffledDeck[3].faceCard +
            shuffledDeck[3].suit +
            " " +
            shuffledDeck[5].faceCard +
            shuffledDeck[5].suit
        );
        bankerVAlue += shuffledDeck[5].cardValue
        bankerVAlue = bankerVAlue % 10; 
      } else if (bankerVAlue === 3 && thirdCard.cardValue != 8) {
        console.log("Banker HITS");
        console.log(
          shuffledDeck[0].faceCard +
            shuffledDeck[0].suit +
            " " +
            shuffledDeck[1].faceCard +
            shuffledDeck[1].suit +
            " " +
            shuffledDeck[4].faceCard +
            shuffledDeck[4].suit +
            " | " +
            shuffledDeck[2].faceCard +
            shuffledDeck[2].suit +
            " " +
            shuffledDeck[3].faceCard +
            shuffledDeck[3].suit +
            " " +
            shuffledDeck[5].faceCard +
            shuffledDeck[5].suit
        );
        bankerVAlue += shuffledDeck[5].cardValue
        bankerVAlue = bankerVAlue % 10; 
      } else if (
        (bankerVAlue === 4 && thirdCard.cardValue !== 0) ||
        thirdCard.cardValue !== 1 ||
        thirdCard.cardValue !== 8 ||
        thirdCard.cardValue !== 9
      ) {
        console.log("Banker HITS");
        console.log(
          shuffledDeck[0].faceCard +
            shuffledDeck[0].suit +
            " " +
            shuffledDeck[1].faceCard +
            shuffledDeck[1].suit +
            " " +
            shuffledDeck[4].faceCard +
            shuffledDeck[4].suit +
            " | " +
            shuffledDeck[2].faceCard +
            shuffledDeck[2].suit +
            " " +
            shuffledDeck[3].faceCard +
            shuffledDeck[3].suit +
            " " +
            shuffledDeck[5].faceCard +
            shuffledDeck[5].suit
        );
        bankerVAlue += shuffledDeck[5].cardValue
        bankerVAlue = bankerVAlue % 10; 
      } else if (
        (bankerVAlue === 4 && thirdCard.cardValue !== 0) ||
        thirdCard.cardValue !== 1 ||
        thirdCard.cardValue !== 8 ||
        thirdCard.cardValue !== 9
      ) {
        console.log("Banker HITS");
        console.log(
          shuffledDeck[0].faceCard +
            shuffledDeck[0].suit +
            " " +
            shuffledDeck[1].faceCard +
            shuffledDeck[1].suit +
            " " +
            shuffledDeck[4].faceCard +
            shuffledDeck[4].suit +
            " | " +
            shuffledDeck[2].faceCard +
            shuffledDeck[2].suit +
            " " +
            shuffledDeck[3].faceCard +
            shuffledDeck[3].suit +
            " " +
            shuffledDeck[5].faceCard +
            shuffledDeck[5].suit
        );
        bankerVAlue += shuffledDeck[5].cardValue
        bankerVAlue = bankerVAlue % 10; 
      } else if (
        (bankerVAlue === 5 && thirdCard.cardValue === 4) ||
        thirdCard.cardValue === 5 ||
        thirdCard.cardValue === 6 ||
        thirdCard.cardValue === 7
      ) {
        console.log("Banker HITS");
        console.log(
          shuffledDeck[0].faceCard +
            shuffledDeck[0].suit +
            " " +
            shuffledDeck[1].faceCard +
            shuffledDeck[1].suit +
            " " +
            shuffledDeck[4].faceCard +
            shuffledDeck[4].suit +
            " | " +
            shuffledDeck[2].faceCard +
            shuffledDeck[2].suit +
            " " +
            shuffledDeck[3].faceCard +
            shuffledDeck[3].suit +
            " " +
            shuffledDeck[5].faceCard +
            shuffledDeck[5].suit
        );
        bankerVAlue += shuffledDeck[5].cardValue
        bankerVAlue = bankerVAlue % 10; 
      } else if (
        (bankerVAlue === 6 && thirdCard.cardValue === 6) ||
        thirdCard.cardValue === 7
      ) {
        console.log("Banker HITS");
        console.log(
          shuffledDeck[0].faceCard +
            shuffledDeck[0].suit +
            " " +
            shuffledDeck[1].faceCard +
            shuffledDeck[1].suit +
            " " +
            shuffledDeck[4].faceCard +
            shuffledDeck[4].suit +
            " | " +
            shuffledDeck[2].faceCard +
            shuffledDeck[2].suit +
            " " +
            shuffledDeck[3].faceCard +
            shuffledDeck[3].suit +
            " " +
            shuffledDeck[5].faceCard +
            shuffledDeck[5].suit
        );
        bankerVAlue += shuffledDeck[5].cardValue
        bankerVAlue = bankerVAlue % 10; 
      }
    } else if (playerValue === 6 || playerValue === 7) {
      console.log("Player STANDS");
      if (bankerVAlue === 6 || bankerVAlue === 7) {
        console.log("Banker STANDS");
        console.log(
          shuffledDeck[0].faceCard +
            shuffledDeck[0].suit +
            " " +
            shuffledDeck[1].faceCard +
            shuffledDeck[1].suit +
            " | " +
            shuffledDeck[2].faceCard +
            shuffledDeck[2].suit +
            " " +
            shuffledDeck[3].faceCard +
            shuffledDeck[3].suit
        );
      }
      if (bankerVAlue < 6) {
        console.log("Banker HITS");
        console.log(
          shuffledDeck[0].faceCard +
            shuffledDeck[0].suit +
            " " +
            shuffledDeck[1].faceCard +
            shuffledDeck[1].suit +
            " | " +
            shuffledDeck[2].faceCard +
            shuffledDeck[2].suit +
            " " +
            shuffledDeck[3].faceCard +
            shuffledDeck[3].suit +
            " " +
            shuffledDeck[4].faceCard +
            shuffledDeck[4].suit
        );
        bankerVAlue += shuffledDeck[4].cardValue;
        bankerVAlue = bankerVAlue % 10; 
      }
    }

    console.log("Player Value: " + playerValue + " Banker Value: " + bankerVAlue); 
    let winnings = 0; 


    if(playerOrBanker === "Player"){
        if(playerValue > bankerVAlue){
            console.log("Player WINS")
            winnings += bet * 2; 

        }
        else if (playerValue === bankerVAlue){
            console.log("Push"); 
           
        }
        else{
            console.log( "player Loses")
            winnings = -bet; 

        }
    }
    else{
        if(bankerVAlue > playerValue){
            console.log("Banker WINS")
            winnings += bet * 1.95; 

        }
        else if (bankerVAlue === playerValue){
            console.log("Push"); 
           
        }
        else{
            console.log( "Banker Loses")
            winnings = -bet; 

        }

    }
    return winnings; 
  };

  const game = (deck) =>{
    let balance = depositMoney();
    while(true){
        const shuffledDeck = shuffleDeck(deck);
        console.log("Users Balance $" + balance);

const playerOrBanker = choosePlayerOrBanker();
const bet = selectBet(playerOrBanker, balance);
const wager = playGame(shuffledDeck, bet, playerOrBanker, balance);
balance = balance +  wager; 

if (balance <= 0){
    console.log("You ran out of money, GAME ENDED"); 
    break; 
}



const input = prompt( "Users Balance $" + balance  +" Play Again? (y/n): "); 
if(input !== 'y' && input !== 'n'){
    console.log("ENTER (y/n): ");
    
}
if(input == 'n'){
    break; 
}


    }

  }
 


const deck = createDeck();
game(deck);

