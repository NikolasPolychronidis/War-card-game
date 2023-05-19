let deckId;
const newDeckBtn = document.getElementById('new-deck-btn');
const drawCardsBtn = document.getElementById('draw-cards-btn');
const computerScoreHeadline = document.getElementById(
  'computer-score-headline'
);
const playerScoreHeadline = document.getElementById('player-score-headline');
const modal = document.getElementById('modal');
const modalResult = document.getElementById('modal-result');
const resetBtn = document.getElementById('reset-btn');

let cardsArray;
let card1;
let card2;
let remainingCards;
let computerScore = 0;
let playerScore = 0;

const header = document.getElementById('header');

async function getNewDeck() {
  const response = await fetch(
    'https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/'
  );
  const data = await response.json();
  deckId = data.deck_id;
  remainingCards = data.remaining;
  document.getElementById(
    'remaining-cards-headline'
  ).innerHTML = `Remaining cards: ${remainingCards}`;

  drawCardsBtn.style.display = 'inline-block';
  document.getElementById('card-one').innerHTML = '';
  document.getElementById('card-two').innerHTML = '';
  newDeckBtn.style.display = 'none';
}

newDeckBtn.addEventListener('click', getNewDeck);

async function drawCards() {
  const response = await fetch(
    `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
  );
  const data = await response.json();
  cardsArray = data.cards;
  card1 = cardsArray[0].value;
  card2 = cardsArray[1].value;
  getCardsHtml();
  compareCards(card1, card2);
  remainingCards = data.remaining;
  document.getElementById(
    'remaining-cards-headline'
  ).innerHTML = `Remaining cards: ${remainingCards}`;
  if (remainingCards === 0) {
    drawCardsBtn.style.display = 'none';
    compareScores();
  }
}

drawCardsBtn.addEventListener('click', drawCards);

function getCardsHtml() {
  const cardOneHtml = `<img class="card-image" src="${cardsArray[0].image}">`;
  const cardTwoHtml = `<img class="card-image" src="${cardsArray[1].image}">`;

  document.getElementById('card-one').innerHTML = cardOneHtml;
  document.getElementById('card-two').innerHTML = cardTwoHtml;
}

function compareCards(card1, card2) {
  const cardValues = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'JACK',
    'QUEEN',
    'KING',
    'ACE',
  ];
  const card1Score = cardValues.indexOf(card1);
  const card2Score = cardValues.indexOf(card2);
  if (card1Score > card2Score) {
    header.textContent = 'Computer wins round';
    computerScore += 1;
  } else if (card2Score > card1Score) {
    header.textContent = 'Player wins round';
    playerScore += 1;
  } else {
    header.textContent = 'WAR!';
  }

  playerScoreHeadline.innerHTML = `Player Score: ${playerScore}`;
  computerScoreHeadline.innerHTML = `Computer Score: ${computerScore}`;
}

function compareScores() {
  setTimeout(function () {
    modal.style.display = 'flex';
  }, 1000);
  if (computerScore > playerScore) {
    modalResult.textContent = `Computer wins with a score of ${computerScore} to ${playerScore}!`;
  } else if (playerScore > computerScore) {
    modalResult.textContent = `Player wins with a score of ${playerScore} to ${computerScore}!`;
  } else {
    modalResult.textContent = "It's a tie!";
  }
}

function resetGame() {
  modal.style.display = 'none';
  computerScore = 0;
  playerScore = 0;
  playerScoreHeadline.innerHTML = `Player Score: ${playerScore}`;
  computerScoreHeadline.innerHTML = `Computer Score: ${computerScore}`;
  getNewDeck();
}

resetBtn.addEventListener('click', resetGame);
