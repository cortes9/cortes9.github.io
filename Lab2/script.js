//event liseners
document.querySelector("#guessBtn").addEventListener("click", guess);

//GLobal Variables
let randomNumber = Math.floor(Math.random() * 99) + 1;
//generates random number between 1 and 99
console.log(randomNumber);
let guessCount = 0;


function guess() {
    let userGuess = document.querySelector("#userGuess").value;

    let message = document.querySelector("#message");

    //"value" is onlyfor input elements
    //alert(userGuess);
    //document.querySelector("#userGuesses").textContent = userGuess + " "; 
    document.querySelector("#userGuesses").textContent += userGuess + " ";

    document.querySelector("#userGuesses").style.color = "red";
    document.querySelector("#userGuesses").style.backgroundColor = "black";

    if(userGuess < 1 || userGuess > 99) {
        message.textContent = "Invalid input. Please enter a number between 1 and 99.";

    }
    else if(userGuess < randomNumber) {
        document.querySelector("#userGuesses").style.color = "cyan";
        message.textContent = "Too low!";
        guessCount++;
        
    } 
    else if(userGuess > randomNumber || userGuess < 1 || userGuess > 99) {
        document.querySelector("#userGuesses").style.color = "red";
        message.textContent = "Too high!";
        guessCount++;
    }
    else if(userGuess == randomNumber && guessCount <= 7) {
        document.querySelector("#userGuesses").style.color = "green";
        message.textContent = "Correct!";
        message.textContent += " It took you " + guessCount + " guesses.";
        
        }
        else if(userGuess == randomNumber) {
            document.querySelector("#userGuesses").style.color = "orange";
            message.textContent = "Correct!";
            message.textContent += " It took you " + guessCount + " guesses. You're not very good at this game.";
        }
}
