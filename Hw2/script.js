// Card values array
let cards = [2,3,4,5,6,7,8,9,10,11];

// Player variables
let playerCards = [];
let dealerCards = [];
let playerSum = 0;
let dealerSum = 0;

let isAlive = false;
let hasStand = false;

// Event listeners
document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("hitBtn").addEventListener("click", hitCard);
document.getElementById("standBtn").addEventListener("click", standGame);

// Start game
function startGame() {

    playerCards = [];
    dealerCards = [];
    playerSum = 0;
    dealerSum = 0;
    isAlive = true;
    hasStand = false;

    drawPlayerCard();
    drawPlayerCard();

    drawDealerCard();
    drawDealerCard();

    updateGame();
}

// Player hits
function hitCard() {
    if (isAlive && !hasStand) {
        drawPlayerCard();
        updateGame();
    }
}

// Stand button
function standGame() {
    if (isAlive) {
        hasStand = true;

        // Dealer draws until 17 or more
        while (dealerSum < 17) {
            drawDealerCard();
        }

        isAlive = false;
        updateGame();
    }
}

// Draw player card
function drawPlayerCard() {
    let randomIndex = Math.floor(Math.random() * cards.length);
    let card = cards[randomIndex];
    playerCards.push(card);
    playerSum += card;
}

// Draw dealer card
function drawDealerCard() {
    let randomIndex = Math.floor(Math.random() * cards.length);
    let card = cards[randomIndex];
    dealerCards.push(card);
    dealerSum += card;
}

// Update page content and style
function updateGame() {

    document.getElementById("playerCards").textContent = playerCards;
    document.getElementById("playerSum").textContent = playerSum;
    document.getElementById("dealerSum").textContent = hasStand ? dealerSum : "?";

    let message = "";
    let image = document.getElementById("resultImage");

    if (playerSum > 21) {
        message = "Bust! You lose.";
        document.body.style.backgroundColor = "darkred";
        image.src = "https://cdn-icons-png.flaticon.com/512/463/463612.png";
        isAlive = false;
    }
    else if (playerSum === 21 && playerCards.length === 2) {
        message = "Blackjack! You win!";
        document.body.style.backgroundColor = "gold";
        image.src = "https://cdn-icons-png.flaticon.com/512/2583/2583344.png";
        isAlive = false;
    }
    else if (hasStand) {

        if (dealerSum > 21 || playerSum > dealerSum) {
            message = "You Win!";
            document.body.style.backgroundColor = "green";
            image.src = "https://cdn-icons-png.flaticon.com/512/190/190411.png";
        }
        else if (dealerSum === playerSum) {
            message = "Tie Game!";
            document.body.style.backgroundColor = "gray";
            image.src = "";
        }
        else {
            message = "Dealer Wins!";
            document.body.style.backgroundColor = "darkred";
            image.src = "https://cdn-icons-png.flaticon.com/512/463/463612.png";
        }
    }
    else {
        message = "Hit or Stand?";
        document.body.style.backgroundColor = "green";
        image.src = "";
    }

    document.getElementById("message").textContent = message;
}