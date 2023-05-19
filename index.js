let deckId;
const newDeckBtn = document.getElementById('new-deck-btn');
const drawCardsBtn = document.getElementById('draw-cards-btn');
let cardsArray;

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
      getCardsHtml();
    });
}

drawCardsBtn.addEventListener('click', drawCards);

function getCardsHtml() {
  const cardOneHtml = `<img class="card-image" src="${cardsArray[0].image}" alt="${cardsArray[0].value} of ${cardsArray[0].suit}">`;
  const cardTwoHtml = `<img class="card-image" src="${cardsArray[1].image}" alt="${cardsArray[1].value} of ${cardsArray[1].suit}">`;

  document.getElementById('card-one').innerHTML = cardOneHtml;
  document.getElementById('card-two').innerHTML = cardTwoHtml;
}
