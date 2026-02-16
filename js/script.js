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
  feedback.style.color = "black";

  previousGuesses.textContent = "";
  attemptsLeftEl.textContent = MAX_ATTEMPTS;

  input.disabled = false;
  input.value = "";
  input.focus();

  guessBtn.style.display = "inline-block";
  resetBtn.style.display = "none";
}

function checkGuess() {
  const guess = parseInt(input.value);

  feedback.textContent = "";
  feedback.style.color = "black";

  if (isNaN(guess)) {
    feedback.textContent = "Enter a valid number between 1 and 99.";
    feedback.style.color = "red";
    return;
  }

  if (guess > 99) {
    feedback.textContent = "Error: Number is higher than 99.";
    feedback.style.color = "red";
    return;
  }

  if (guess < 1) {
    feedback.textContent = "Error: Number must be at least 1.";
    feedback.style.color = "red";
    return;
  }

  attempts++;
  attemptsLeftEl.textContent = MAX_ATTEMPTS - attempts;

  previousGuesses.textContent += guess + " ";

  if (guess === randomNumber) {
    wins++;
    winsEl.textContent = wins;

    feedback.textContent = "Congratulations! You guessed it in " + attempts + " attempts!";
    feedback.style.color = "green";

    endGame();
    return;
  }

  if (attempts >= MAX_ATTEMPTS) {
    losses++;
    lossesEl.textContent = losses;

    feedback.textContent = "You Lost! The number was " + randomNumber + ".";
    feedback.style.color = "red";

    endGame();
    return;
  }

  if (guess < randomNumber) {
    feedback.textContent = "Too low! Try a higher number.";
  } else {
    feedback.textContent = "Too high! Try a lower number.";
  }

  input.value = "";
  input.focus();
}

function endGame() {
  guessBtn.style.display = "none";
  resetBtn.style.display = "inline-block";
  input.disabled = true;
}
