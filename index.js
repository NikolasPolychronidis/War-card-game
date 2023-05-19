let deckId;
const newDeckBtn = document.getElementById('new-deck-btn');
const drawCardsBtn = document.getElementById('draw-cards-btn');
let cardsArray;
let card1;
let card2;
const header = document.getElementById('header');
function getNewDeck() {
  fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then(res => res.json())
    .then(data => {
      deckId = data.deck_id;
    });
  drawCardsBtn.style.display = 'inline-block';
}

newDeckBtn.addEventListener('click', getNewDeck);

function drawCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
      cardsArray = data.cards;
      card1 = cardsArray[0].value;
      card2 = cardsArray[1].value;
      getCardsHtml();
      compareCards(card1, card2);
    });
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
  const result =
    card1Score > card2Score
      ? 'Card 1 wins'
      : card2Score > card1Score
      ? 'Card 2 wins'
      : 'WAR!';
  header.textContent = result;
}
