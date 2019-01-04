let matchedCards = [];
let numOfStars = [];
let openCards = [];
let moves = 0;
let gameTimer;
let sec = 0;
let min = 0;
let hr = 0;
let moveCounter = document.querySelector('span.moves');
let deck = document.querySelector('ul.deck');
let stars = document.querySelectorAll('ul.stars li');
let reset = document.querySelector('div.restart');
let spanTimer = document.querySelector('span.timer');


function startTimer() {
    gameTimer = setInterval(function() {
        sec++;
        spanTimer.innerHTML = `${hr}HR:${min}MIN:${sec}SEC`;

        if (sec == 60) {
            min++;
            sec = 0;

        }
        if (min == 60) {
            hr++;
            min = 0;
        }

    }, 1000);

}


function stopTimer() {
    clearInterval(gameTimer);

}

function initGame() {
    //get list of cards
    let listOfCards = document.getElementsByClassName('card');
    //shuffle list of cards
    listOfCards = shuffle(Array.from(listOfCards));
    // loop through shuffled list of cards and add them back to deck
    for (let card of listOfCards) {
        card.classList.remove('open', 'match', 'show');
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

    let deck = document.querySelector('ul.deck');
    deck.addEventListener('click', function(e) {
        if ((e.target.nodeName === 'LI') && !e.target.classList.contains('open') && !e.target.classList.contains('show') && !e.target.classList.contains('match')) {
            openCards.push(e.target);
            e.target.classList.add('open', 'show')
            if (openCards.length === 2) {
                //initiate counter for every move
                counter();
                //check if cards match
                checkMatch(openCards);
                openCards = [];
            }
        }
    });

}


function checkMatch(array) {
    //check if match
    if (array[0].firstElementChild.classList.item(1) ===
        array[1].firstElementChild.classList.item(1)) {
        array[0].classList.add('match');
        array[1].classList.add('match');
        matchedCards.push(array[0], array[1]);
        //check for winning game condition
        winGame(matchedCards);
    } else {
        //if no match

        array[0].classList.add('flip');
        array[1].classList.add('flip');
        noMatch(array);

    }
}


function noMatch(array) {

    setTimeout(function() {
        for (c of array) {
            c.classList.remove('open', 'show','flip');
        }
        array = [];
    }, 800);

}


function counter() {
    moves += 1;
    moveCounter.innerHTML = moves;
    if (moves == 1) {
      //start timer
        startTimer();
    }
    // hide stars when moves increase
    if (moves > 8 && moves <= 16) {
        document.getElementById('first').style.display = "none";
    } else if (moves > 16) {
        document.getElementById('second').style.display = "none";

    }

}


function winGame(array) {
    if (array.length === 16) {
        //stop timer
        stopTimer();
        //count number of stars at end of game
        countStars();
        //show modal with player game details
        swal({
            title: "Congratulations! You won!",
            text: `In ${hr} hr: ${min} mins: ${sec} secs with ${numOfStars.length} star(s)  and ${moves} moves `,
            icon: "success",
            //button: "Play Again!",
            buttons: [true, "Play Again!"],
            closeOnClickOutside: false,
        }).then((value) => {
            if (value) {
                //if player chooses to play again
                resetGame();
            } else{
              swal('Thanks for playing! Close the tab on your way out!');
            }

        });

    }

}


function countStars() {
    for (star of stars) {
        //only count stars without style attr set
        if (!star.hasAttribute('style')) {
            numOfStars.push(star);
        }
    }

}


//reset game
reset.addEventListener('click', resetGame);


function resetGame() {
    numOfStars = [];
    matchedCards = [];
    openCards = [];
    //reset timer
    stopTimer();
    sec = 0;
    hr = 0;
    min = 0;
    spanTimer.innerHTML = `${hr}HR:${min}MIN:${sec}SEC`;

    //reset moves
    moves = 0;
    moveCounter.innerHTML = moves;

    //reset stars
    for (star of stars) {
        //remove style attr from all stars
        star.removeAttribute('style');
    }

    initGame();
}

initGame();
