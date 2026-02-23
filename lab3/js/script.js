// Event listener
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#submitQuiz").addEventListener("click", gradeQuiz);
    shuffleQ1Choices();
    loadTimesTaken();
});

// Images for correct / incorrect
const correctImg = "https://cdn-icons-png.flaticon.com/512/190/190411.png";
const wrongImg = "https://cdn-icons-png.flaticon.com/512/1828/1828665.png";

// This function grades the quiz
function gradeQuiz() {

    let score = 0; // keeps track of total score

    // Question 1
    let answerQ1 = "Water";
    let q1 = document.querySelector("input[name=q1]:checked");

    if (q1 && q1.value === answerQ1) {
        showFeedback("q1Feedback", true);
        score += 20;
    } else {
        showFeedback("q1Feedback", false);
    }

    // Question 2
    let answerQ2 = "Ash";
    let q2 = document.querySelector("#q2Answer").value.trim();

    if (q2 === answerQ2) {
        showFeedback("q2Feedback", true);
        score += 20;
    } else {
        showFeedback("q2Feedback", false);
    }

    // Question 3
    let answerQ3 = "Ghost";
    let q3 = document.querySelector("#q3Answer").value;

    if (q3 === answerQ3) {
        showFeedback("q3Feedback", true);
        score += 20;
    } else {
        showFeedback("q3Feedback", false);
    }

    // Question 4
    let answerQ4 = 1025;
    let q4 = Number(document.querySelector("#q4Answer").value);

    if (q4 === answerQ4) {
        showFeedback("q4Feedback", true);
        score += 20;
    } else {
        showFeedback("q4Feedback", false);
    }

    // Question 5 (Checkbox)
    let q5 = document.querySelector("input[name=q5]:checked");

    if (q5 && q5.value === "Electric") {
        showFeedback("q5Feedback", true);
        score += 20;
    } else {
        showFeedback("q5Feedback", false);
    }

    // Display total score
    document.querySelector("#totalScore").textContent =
        "Total Score: " + score + " / 100";

    // Congratulatory message if score above 80
    if (score > 80) {
        document.querySelector("#congrats").textContent =
            "Congratulations! 🎉 Great job!";
    } else {
        document.querySelector("#congrats").textContent = "";
    }

    // Local Storage - count times quiz was taken
    let timesTaken = localStorage.getItem("quizTaken");

    if (timesTaken === null) {
        timesTaken = 0;
    }

    timesTaken++;
    localStorage.setItem("quizTaken", timesTaken);

    document.querySelector("#timesTaken").textContent =
        "Quiz taken: " + timesTaken + " times";
}

// This function shows correct or incorrect feedback
function showFeedback(id, isCorrect) {

    let feedback = document.querySelector("#" + id);
    feedback.innerHTML = "";

    let img = document.createElement("img");
    img.src = isCorrect ? correctImg : wrongImg;
    img.width = 20;

    let text = document.createElement("span");
    text.textContent = isCorrect ? " Correct!" : " Incorrect!";
    text.style.color = isCorrect ? "green" : "red";

    feedback.appendChild(img);
    feedback.appendChild(text);
}

// This function shuffles Question 1 choices
function shuffleQ1Choices() {

    let choices = ["Water", "Fire", "Water and Ice", "Steel"];
    choices = _.shuffle(choices);

    let container = document.querySelector("#q1ChoicesDiv");
    container.innerHTML = "";

    for (let i = 0; i < choices.length; i++) {

        let input = document.createElement("input");
        input.type = "radio";
        input.name = "q1";
        input.id = "choice" + i;
        input.value = choices[i];

        let label = document.createElement("label");
        label.setAttribute("for", "choice" + i);
        label.textContent = choices[i];

        container.appendChild(input);
        container.appendChild(label);
        container.appendChild(document.createElement("br"));
    }
}

// This function loads how many times quiz was taken
function loadTimesTaken() {

    let timesTaken = localStorage.getItem("quizTaken");

    if (timesTaken === null) {
        timesTaken = 0;
    }

    document.querySelector("#timesTaken").textContent =
        "Quiz taken: " + timesTaken + " times";
}