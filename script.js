'use strict';

//--------------------------//
//SELECTING ELEMENTS
const playerScoreOne = document.getElementById('score--0');
const playerScoreTwo = document.getElementById('score--1');
const playerNameOne = document.getElementById('name--0');
const playerNameTwo = document.getElementById('name--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let playerScoreCurrOne = document.getElementById('current--0');
let playerScoreCurrTwo = document.getElementById('current--1');
let currentScore = 0;

//--------------------------//
//ACTIVE PLAYER
let activePlayer = 0;

//--------------------------//
//PLAYERS SCORE
let scores = [0, 0];

//--------------------------//
//STARTING CONDITION
playerScoreOne.textContent = 0;
playerScoreTwo.textContent = 0;
playerScoreCurrOne.textContent = 0;
playerScoreCurrTwo.textContent = 0;
diceEl.classList.add('hidden');

//--------------------------//
//
let isPlaying = true;

//SWITCH USER FUNCTION WHEN DICE === 1 AND USER HOLDS SCORE
const switchUser = () => {
  isPlaying = true;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

//
btnRoll.addEventListener('click', function () {
  //--------------------------//
  //STATE VARIBLES USED
  if (isPlaying) {
    //--------------------------//
    //GENERATE RANDOM DICE ROLL
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log({ dice });

    //--------------------------//
    //DISPLAY DICE ROLL
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //--------------------------//
    //CHECK FOR ROLLED 1: IF TRUE, SWITCH TO NEXT PLAYER
    if (dice !== 1) {
      //--------------------------//
      //ADD DICE NUUMER TO CURRENT SCORE
      currentScore += dice;
      console.log({ currentScore });
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //--------------------------//
      //SWITCH TO NEXT PLAYER
      switchUser();
    }
  }
});

//--------------------------//
//HOLD CURRENT SCORES
btnHold.addEventListener('click', function () {
  //--------------------------//
  //STATE VARIBLES USED
  if (isPlaying) {
    //ADD CURRENT SCORE OF ACTIVE PLAYER TO ARRAY
    scores[activePlayer] += currentScore;

    //--------------------------//
    //DISPLAYS SCORES TO THE PAGE
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //--------------------------//
    //CHECK IF SCORE IS >= 100, FINISH THE GAME
    if (scores[activePlayer] >= 20) {
      isPlaying = false;
      document.getElementById(`name--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
      } Won`;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      //   btnRoll.style.display = 'none';
      //   btnHold.style.display = 'none';
      currentScore = 0;
      scores = [0, 0];
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      diceEl.classList.add('hidden');
    } else {
      //--------------------------//
      //SWITCH TO NEXT PLAYER
      switchUser();
    }
  }
});

//--------------------------//
//NEW GAME

btnNew.addEventListener('click', function () {
  isPlaying = true;
  //--------------------------//
  //REMOVING THE WINNER CLASS FROM WHOEVER THE WINNER IS.
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  //--------------------------//
  //RE-INITIALIZING IT BACK TO PLAYER ONE AND EVERY-OTHER PARAMETER BACK TO 0
  activePlayer = 0;
  currentScore = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  playerNameOne.textContent = `Player 1`;
  playerNameTwo.textContent = `Player 2`;
  playerScoreOne.textContent = 0;
  playerScoreTwo.textContent = 0;
  diceEl.classList.add('hidden');
});
