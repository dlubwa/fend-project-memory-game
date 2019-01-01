/*
 * Create a list that holds all of your cards
 */
//store list of cards
let matchedCards = [];
let moves = 0;
let gameTimer;
let timer = 0;
let moveCounter = document.querySelector('span.moves');
let deck = document.querySelector('ul.deck');
let stars = document.querySelector('ul.stars');
let reset = document.querySelector('div.restart');
let initialClick = false;

function startTimer(){
      let spanTimer = document.querySelector('span.timer');
      gameTimer = setInterval(function() {
          timer += 1;
          spanTimer.innerHTML = timer;

      }, 1000);
    }


function stopTimer(){
      clearInterval(gameTimer);
    }

function initGame() {
    //reset number of moves and star counter

    let listOfCards = document.getElementsByClassName('card');
    listOfCards = shuffle(Array.from(listOfCards));
    // loop through shuffled list of cards and add them back to deck
    for (let card of listOfCards) {
        deck.appendChild(card);
    }

    flipCard();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// set up click event handler on deck to flip cards
function flipCard() {
     let matchCards = [];
     let openCards = [];
     let deck = document.querySelector('ul.deck');
    deck.addEventListener('click', function(e) {
        if ((e.target.nodeName === 'LI') && !e.target.classList.contains('open') && !e.target.classList.contains('show') && !e.target.classList.contains('match')) {
            openCards.push(e.target);
            e.target.classList.add('open', 'show')
            startTimer();
            // initialClick = true;
            // if (initialClick){ /*start game timer */ startTimer(); }
            if (openCards.length === 2){
              //check if cards match
              checkMatch(openCards);
              openCards = [];
              //initiate counter for every move
              counter();

            }

          }
      });

}


function checkMatch(array){
    //check if match
    if (array[0].firstElementChild.classList.item(1) ===
       array[1].firstElementChild.classList.item(1)){
         array[0].classList.add('match');
         array[1].classList.add('match');
         matchedCards.push(array[0], array[1]);
         //check for winning game condition
         winGame(matchedCards);

       } else {
           //if no match
           noMatch(array);
       }
}


function noMatch(array){
  setTimeout(function() {
      for (c of array) {
          c.classList.remove('open', 'show');
      }
      array = [];
  }, 500);

}

function counter(){
  moves += 1;
  moveCounter.innerText = moves;
  if (moves > 8 && moves <= 16){
    document.getElementById('first').style.display="none";
  }else if (moves > 16){
    document.getElementById('second').style.display = "none";

  }


}

function winGame(array){
  let numStars = document.getElementsByClassName("star");
  if (array.length === 16) {
    //stop timer

    stopTimer();
      swal({
          title: "Congratulations! You won!",
          text: `Wooooooo! you finished the game in ${timer} seconds and ${numStars.length} stars`,
          icon: "success",
          button: "Play Again!",
          closeOnClickOutside: false,
      });

  }

}

reset.addEventListener('click', function() {
        moves = 0;
        initGame();
    })



initGame();
