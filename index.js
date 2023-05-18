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
  const cardsHtml = cardsArray
    .map(function (card) {
      return `<img src="${card.image}" alt="${card.value} of ${card.suit}">`;
    })
    .join('');
  document.getElementById('cards').innerHTML = cardsHtml;
}
