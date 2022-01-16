var timerEl = document.getElementById('timer-display');
var startGameEl = document.querySelector("#new-game");
var gameContainer = document.querySelector("#questions");
var scoreScreenEl = document.querySelector("#score-screen");
var viewScoresEl = document.querySelector("#view-scores");
var clearScoresEl = document.querySelector("#clear-scores");
var scoreDisplayEl = document.querySelector("#scores-display");

var questionEl = document.createElement("h3");
var accuracyEl = document.createElement("h3");
var scoreEl = document.createElement("h3");
var formEl = document.createElement("input");
var formBtnEl = document.createElement("button");
formBtnEl.className = "form-btn";

var answer1El = document.createElement("button");
answer1El.className = "btn answer-btn";
var answer2El = document.createElement("button");
answer2El.className = "btn answer-btn";
var answer3El = document.createElement("button");
answer3El.className = "btn answer-btn";
var answer4El = document.createElement("button");
answer4El.className = "btn answer-btn";

var timeLeft = 90;
var userScore = 0;
var questionsIndex = 0;
var timeInterval;
var arrCounter = 0;

function question(question, ans1, ans2, ans3, ans4, correctAns) {
    this.question = question;
    this.ans1 = ans1;
    this.ans2 = ans2;
    this.ans3 = ans3;
    this.ans4 = ans4;
    this.correctAns = correctAns;
};

var questions = [
    new question("Which header tag is the largest in HTML?", "h1", "h3", "h6", "h0", "h1"),
    new question("What CSS rule allows for styling on different devices?", "@screen", "@size", "@monitor", "@media", "@media"),
    new question("What statement will terminate a switch statement in JavaScript?", "continue", "exit", "break", "end", "break"),
    new question("What HTML tag enables a functioning hyperlink?", "src", "href", "label", "name", "href"),
    new question("What CSS variable is used for declaring global variables?", "root", "form", "label", "body", "root"),
    new question("In JavaScript, what value is NOT conidered 'false' by a boolean evaluation?", "false", "0", "'false'", "undefined", "'false'")
]

function gameTimer() {
    timeInterval = setInterval(function() {
        timerEl.textContent = timeLeft + " second(s) remaining!";
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            clearInterval(timeInterval);
        }
    }, 1000)
}

function generateQuestion() {
    startGameEl.style.display = "none";
    if (questionsIndex === questions.length || timeLeft <= 0) {
        // Stop timer and clear elements from page
        clearInterval(timeInterval)
        gameContainer.style.display = "none";
        timerEl.style.display = "none";
        // Prompt for initials and set score
        setUserScore();
    } else {
        questionEl.textContent = questions[questionsIndex].question;
        answer1El.textContent = questions[questionsIndex].ans1;
        answer2El.textContent = questions[questionsIndex].ans2;
        answer3El.textContent = questions[questionsIndex].ans3;
        answer4El.textContent = questions[questionsIndex].ans4;
        gameContainer.appendChild(questionEl);
        gameContainer.appendChild(answer1El);
        gameContainer.appendChild(answer2El);
        gameContainer.appendChild(answer3El);
        gameContainer.appendChild(answer4El);

        var selectedAnswer = document.querySelectorAll(".answer-btn")
        
        for (i = 0; i < selectedAnswer.length; i++) {
            selectedAnswer[i].addEventListener("click", checkAnswer);
        }
    }
}

function checkAnswer(event) {
    var targetEl = event.target;
    if (questions[questionsIndex].correctAns === targetEl.textContent) {
        accuracyEl.textContent = "Correct!";
        gameContainer.appendChild(accuracyEl);
    } else {
        accuracyEl.textContent = "Incorrect.";
        gameContainer.appendChild(accuracyEl);
        timeLeft -= 5;
    }
    questionsIndex++;
    generateQuestion();
}

function setUserScore() {
    if (timeLeft >= 0) {
        userScore = timeLeft;
    } else {
            userScore = 0;
    }
    scoreEl.textContent = "Your score is " + userScore;
    scoreScreenEl.appendChild(scoreEl);

    // Create form to have user enter initials
    formEl.setAttribute("type", "text");
    formEl.setAttribute("name", "user-initials");
    formEl.setAttribute("placeholder", "Enter Your Initials.");
    scoreScreenEl.appendChild(formEl);
    formBtnEl.textContent = "Submit";
    scoreScreenEl.appendChild(formBtnEl);

    // Create listener for submit button, and store score/user initials
    var formSubmit = document.querySelector(".form-btn");

    formSubmit.addEventListener("click", storeScore);
}

function storeScore() {
    scoreScreenEl.style.display = "none";
    var userInitials = document.querySelector("input[name='user-initials']").value;

    var userScoreObj = {
        score: userScore,
        initials: userInitials
    }

    if (!userInitials) {
        alert("Please enter your initials.");
        return false;
    }

    var highScores = JSON.parse(localStorage.getItem("scores")) || [];

    highScores.push(userScoreObj);
    localStorage.setItem("scores", JSON.stringify(highScores));
}

function viewScores() {
    var savedScores = localStorage.getItem("scores");

    if (savedScores === null) {
        return false;
    }

    savedScores = JSON.parse(savedScores);

    for (var i = 0; i < savedScores.length; i++) {
        displayScores(savedScores[i]);
    }
}

function displayScores(userScoreObj) {
    var userDisplayEl = document.createElement("h3");
    userDisplayEl.textContent = "Score: " + userScoreObj.score + " Initials: " + userScoreObj.initials;
    scoreDisplayEl.appendChild(userDisplayEl);    
}

function clearScores() {
    localStorage.clear();
    location.reload;
}

startGameEl.addEventListener("click", gameTimer);
startGameEl.addEventListener("click", generateQuestion);
viewScoresEl.addEventListener("click", viewScores);
clearScoresEl.addEventListener("click", clearScores);