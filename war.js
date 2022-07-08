"use strict";

let rlsync = require('readline-sync');

const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
const FACES = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

class Player {
  getNewCard(deck) {
    let myCard = deck.cards.pop();
    this.currentCard = myCard;
    return myCard;
  }
}

class Dealer extends Player {
  greet(player) {
    console.clear();
    console.log(`Welcome to War!`);
    console.log('Rules: Each player picks one random card. The highest card wins!');
    console.log('----------------');
    player.name = rlsync.question(`Enter your name:\n`);
    console.clear();
    console.log(`Hi ${player.name}!`);
  }

  promptUserPick(player, deck) {
    let response = rlsync.question(`Press 'enter' to pick a card!\n`);
    if (response === '') {
      let card = player.getNewCard(deck);
      console.log(`You picked the ${card.face} of ${card.suit}!`);
    }
  }

  dealerPicks(deck) {
    let dealerCard = this.getNewCard(deck);
    console.log(`Dealer picked the ${dealerCard.face} of ${dealerCard.suit}!`);
  }

  determineWinner(player) {
    let dealerCardValue = this.currentCard.calculateValue();
    let playerCardValue = player.currentCard.calculateValue();

    console.log(`Dealer: ${dealerCardValue} | ${player.name}: ${playerCardValue}`);
    console.log('\n');
    if (dealerCardValue > playerCardValue) {
      console.log('Dealer Wins!');
    } else if (dealerCardValue < playerCardValue) {
      console.log('You Win!');
    } else {
      console.log(`It's a tie!`);
    }
  }
}

class Card {
  constructor(face, suit) {
    this.face = face;
    this.suit = suit;
  }

  calculateValue() {
    if (this.face === 'A') {
      return 11;
    } else if (typeof this.face === 'number') {
      return this.face;
    } else {
      return 10;
    }
  }
}

class Deck {
  #shuffle(deck) {
    let shuffledDeck = [];
    while (shuffledDeck.length < 52) {
      let randomIdx = Math.floor(Math.random() * deck.length);
      shuffledDeck.push(deck[randomIdx]);
      deck.slice(randomIdx, 1);
    }
    return shuffledDeck;
  }

  constructor() {
    this.cards = this.createNewDeck();
  }

  createNewDeck() {
    let deck = [];
    FACES.forEach(face => {
      SUITS.forEach(suit => {
        deck.push(new Card(face, suit));
      });
    });
    return this.#shuffle(deck);
  }
}

let user = new Player();
let dealer = new Dealer();
let newDeck = new Deck();
let playAgain = true;

dealer.greet(user);

while (playAgain === true) {
  newDeck = new Deck();
  dealer.promptUserPick(user, newDeck);
  dealer.dealerPicks(newDeck);
  console.log('\n');
  dealer.determineWinner(user);
  console.log('\n');
  playAgain = rlsync.question(`Play again? (Enter 'q' to quit or any key to play again)\n`);
  if (playAgain === 'q') {
    console.log('Thanks for playing War!');
    break;
  } else {
    playAgain = true;
    console.clear();
  }
}

// ---TESTS---
// console.log(newDeck.cards.length === 50);
// console.log(dealer);
// console.log(user);


// ---ALGO---
/* 
// Create a player object
- Has ability to pick a card
// Create a dealer object
- Has ability to pick a card
- Has ability to say who won
// Create card objects
- Creates a unique card object for each deck of cards
// Create a deck of question()
- Uses card objects to create a deck of cards


// War
// Welcome to War! Press enter to begin!
// Dealer picks a card
// Player picks a card
// If Player's card is higher, player wins
// If Dealer's card is higher, dealer wins
// Play Again?
*/
