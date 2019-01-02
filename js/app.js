/*
 * Create a list that holds all of your cards
 */
//store list of cards
let matchedCards = [];
let numOfStars = [];
let moves = 0;
let gameTimer;
let sec = 0;
let min = 0;
let hr = 0;
let moveCounter = document.querySelector('span.moves');
let deck = document.querySelector('ul.deck');
let stars = document.querySelectorAll('ul.stars li');
let reset = document.querySelector('div.restart');
let initialClick = false;

function startTimer(){
      let spanTimer = document.querySelector('span.timer');
      gameTimer = setInterval(function() {
          sec++;
          spanTimer.innerHTML = `H${hr}:M${min}:S${sec}`;

          if (sec == 60){
            min++;
            sec = 0;

          }
          if (min == 60){
            hr++;
            min = 0;
          }

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
    //startTimer();
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
     let openCards = [];
     let deck = document.querySelector('ul.deck');
    deck.addEventListener('click', function(e) {
        if ((e.target.nodeName === 'LI') && !e.target.classList.contains('open') && !e.target.classList.contains('show') && !e.target.classList.contains('match')) {
            openCards.push(e.target);
            e.target.classList.add('open', 'show')
            if (openCards.length === 2){
              //initiate counter for every move
              counter();
              //check if cards match
              checkMatch(openCards);
              openCards = [];

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
  moveCounter.innerHTML = moves;
  if (moves == 1){
    startTimer();
  }
  if (moves > 8 && moves <= 16){
    document.getElementById('first').style.display="none";
  }else if (moves > 16){
    document.getElementById('second').style.display = "none";

  }


}

function winGame(array){
  //let numStars = document.getElementsByClassName("star");

  if (array.length === 16) {
    //stop timer

    stopTimer();
    countStars();
      swal({
          title: "Congratulations! You won!",
          text: `Wooooooo! you finished the game in ${hr}:${min}:${sec} seconds with ${moves} moves ${numOfStars.length} star`,
          icon: "success",
          button: "Play Again!",
          closeOnClickOutside: false,
      });

  }

}

function countStars(){

  for (star of stars){
    if(!star.hasAttribute('style')){
      numOfStars.push(star);
      //console.log(star);
      //document.querySelector('.stars').innerHTML = star;
    }

  }
  //console.log(numOfStars.length)
}

reset.addEventListener('click', function() {
        moves = 0;
        initGame();
    })



initGame();
