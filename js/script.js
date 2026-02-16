let randomNumber;
let attempts;
let wins = 0;
let losses = 0;

const MAX_ATTEMPTS = 7;

const guessBtn = document.querySelector("#guessBtn");
const resetBtn = document.querySelector("#resetBtn");
const input = document.querySelector("#playerGuess");
const feedback = document.querySelector("#feedback");
const previousGuesses = document.querySelector("#previousGuesses");
const attemptsLeftEl = document.querySelector("#attemptsLeft");
const winsEl = document.querySelector("#wins");
const lossesEl = document.querySelector("#losses");

guessBtn.addEventListener("click", checkGuess);
resetBtn.addEventListener("click", initializeGame);

initializeGame();

function initializeGame() {
  randomNumber = Math.floor(Math.random() * 99) + 1;
  attempts = 0;

  feedback.textContent = "";
  feedback.className = "feedback";
  previousGuesses.textContent = "";
  attemptsLeftEl.textContent = MAX_ATTEMPTS;

  input.disabled = false;
  input.value = "";
  input.focus();

  guessBtn.disabled = false;
  guessBtn.style.display = "inline-block";
  resetBtn.style.display = "none";
}

function checkGuess() {
  feedback.textContent = "";
  feedback.className = "feedback";

  const guess = parseInt(input.value, 10);

  if (isNaN(guess) || guess < 1 || guess > 99) {
    feedback.textContent = "Enter a valid number between 1 and 99.";
    feedback.classList.add("bad");
    return;
  }

  attempts++;
  attemptsLeftEl.textContent = MAX_ATTEMPTS - attempts;
  previousGuesses.textContent += guess + " ";

  if (guess === randomNumber) {
    wins++;
    winsEl.textContent = wins;
    feedback.textContent = "Congratulations! You guessed the number in " + attempts + " attempt(s).";
    feedback.classList.add("good");
    endGame();
    return;
  }

  if (attempts >= MAX_ATTEMPTS) {
    losses++;
    lossesEl.textContent = losses;
    feedback.textContent = "You Lost! The number was " + randomNumber + ".";
    feedback.classList.add("lost");
    endGame();
    return;
  }

  if (guess < randomNumber) {
    feedback.textContent = "Too low — try a higher number.";
    feedback.classList.add("hint");
  } else {
    feedback.textContent = "Too high — try a lower number.";
    feedback.classList.add("hint");
  }

  input.value = "";
}

function endGame() {
  guessBtn.disabled = true;
  guessBtn.style.display = "none";
  resetBtn.style.display = "inline-block";
  input.disabled = true;
}

