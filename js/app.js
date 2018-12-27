/*
 * Create a list that holds all of your cards
 */
//store list of cards
 let listOfCards = document.getElementsByClassName('card');

 let deck = document.querySelector('ul.deck');
// start game by shuffling list of cards
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 listOfCards = shuffle(Array.from(listOfCards));
// loop through shuffled list of cards and add them back to deck
 for (let card of listOfCards){
        //turn cards upside down to hide symbols
      card.classList.remove('open','match','show');
      deck.appendChild(card);
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// set up click event handler on deck for listen for clicks on all child listOfCards
let openCards = [];
deck.addEventListener('click', function(e){
  //console.log('you clicked the deck');
  if (e.target.nodeName === 'LI') {
    //if card is clicked display symbol
    e.target.classList.add('open','show');
    openCards.push(e.target);
    console.log(openCards);
  }
});


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
