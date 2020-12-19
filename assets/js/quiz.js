/* GLOBALS */
const questions = [];

var score = 0;
var timer = questions.length * 10; // 10 seconds for each question

// grab each of the 3 divs in main and put them in an array
var landingDivEl = document.querySelector("#landing");
var quizDivEl = document.querySelector("#quiz");
var endDivEl = document.querySelector("#end");

var mainDivs = [landingDivEl, quizDivEl, endDivEl];

// TODO: grab buttons, time span, question, answer list, player score, form
var startBtnEl = document.querySelector("#start-button");

var questionEl = document.querySelector("#question");
var answerListEl = document.querySelector("#answers");

var correctAnswersEl = document.querySelector("#correct-answers");
var totalQuestionsEl = document.querySelector("#total-questions");
var scoreEl = document.querySelector("#player-score");

var formEl = document.querySelector("#submit-score-form");



/* FUNCTIONS */
/* makes all divs in mainDivs invisible, except for the one with the specified id. */
var changeState = function(id) {
    for(var i = 0; i < mainDivs.length; i++) {
        mainDivs[i].setAttribute("style", "display: none;");

        if (mainDivs[i].id === id) {
            mainDivs[i].setAttribute("style", "display: block;");
        }
    }
};


/* once the start button is clicked, reveal and start the quiz. */
var beginQuizHandler = function() {
    takeQuiz();
};


/* continue answering questions until there are none left. */
var takeQuiz = function() {
    changeState("quiz");

    for (var i = 0; i < questions.length; i++) {
        // add question plus answer choices
        //displayQuestion(i);
        // when question is answered, progress to next question
    }

    // once all questions have been answered, continue to the end.
    endQuiz();
};

// TODO: displayQuestion function. display question, grab player answer;
//       then modify score and timer accordingly.

// TODO: timing function. decrement timer by 1 every 1000 ms. Once timer reaches
//       zero, end the Quiz regardless of how many questions were answered.


/* evaluate and display score. The final score is your
   total correct answers times 100 plus any time remaining. */
var endQuiz = function() {
    changeState("end");

    correctAnswersEl.textContent = score;
    totalQuestionsEl.textContent = questions.length;
    scoreEl.textContent = score * 100 + timer;
};


/* validate form and store the player's name (aka initials) / score 
   in localStorage, then continue to high scores page. */
var scoreFormHandler = function(event) {
    // prevent form submission from reloading the page, and get initials.
    event.preventDefault();
    var initialsInput = document.querySelector("input[name='player-initials']").value;
    
    // check that the player's initials were typed.
    if (!initialsInput) {
        alert("Please type your initials.");
        return false;
    }

    // make a scoreObj from the player's initials and score.
    var scoreObj = {
        name: initialsInput,
        score: score
    }

    // grab scores from localStorage and put into an array.
    // if null, scores becomes an empty array.
    var scores = JSON.parse(localStorage.getItem("scores")) || [];
    
    // append scoreObj, then put the scores back.
    scores.push(scoreObj);
    localStorage.setItem("scores", JSON.stringify(scores));

    // finally, send user to the high scores page.
    window.location.href = "./highscores.html";
};

/* EVENT LISTENERS */
startBtnEl.addEventListener("click", beginQuizHandler);
formEl.addEventListener("submit", scoreFormHandler);

/* Akram Sabbah */