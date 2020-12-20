/* GLOBALS */
const questions = ["placeholder"];
const maxTime = questions.length * 10; // 10 seconds for each question

var score = 0;
var timer = 0;

 // this will stop countdown() once all questions are answered, and end the quiz
var quizFinished = false;

// grab each of the 3 divs in main and put them in an array
var landingDivEl = document.querySelector("#landing");
var quizDivEl = document.querySelector("#quiz");
var endDivEl = document.querySelector("#end");

var mainDivs = [landingDivEl, quizDivEl, endDivEl];

// grab button, time display, question, answer list, player score, and form elements
var startBtnEl = document.querySelector("#start-button");

// element to display the timer
var timerEl = document.querySelector("#timer");
timerEl.textContent = 0; // initialize displayed time to zero

// displays for question and answer options during the quiz
var questionEl = document.querySelector("#question");
var answerListEl = document.querySelector("#answers");

// elements to display the user's score
var correctAnswersEl = document.querySelector("#correct-answers");
var totalQuestionsEl = document.querySelector("#total-questions");
var scoreEl = document.querySelector("#player-score");

// form to submit user's initials and score
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
    // begin countdown, then display the first question
    countdown();
    displayQuestion(0);
};


// TODO: displayQuestion function. display question, grab player answer;
//       then modify score and timer accordingly.



/* timing function. decrement timer by 1 every 1000 ms. Once timer reaches
   zero or the questions ran out, end the Quiz regardless of how many questions were answered. */
var countdown = function() {
    // reset timerEl to maxTime
    timerEl.textContent = maxTime;
    // have timer compensate for the extra second timeInterval takes to begin callback
    timer = maxTime - 1;
    
    // decrement timer each second until zero, or the quiz ends.
    var timeInterval = setInterval(function() {
        timerEl.textContent = timer;
        if (timer <= 0 || quizFinished) {
            // if timer is negative, set it to zero
            timer = Math.max(timer, 0);
            timerEl.textContent = timer;
            clearInterval(timeInterval);
            endQuiz();
        }
        timer--;
    }, 1000);
};


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