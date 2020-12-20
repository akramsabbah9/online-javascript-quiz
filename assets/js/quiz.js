/* GLOBALS */
const questions = [
    {
        question: "placeholder",
        answers: ["1", "2", "3", "4"],
        correct: 2
    }
];
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
var timeBonusEl = document.querySelector("#time-bonus");
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
var displayQuestion = function(qIndex) {
    // get the current question and clear the answers list
    var currQuestion = questions[qIndex];
    var correctAns = currQuestion.answers[currQuestion.correct];
    console.log(correctAns);
    answerListEl.innerHTML = "";

    // display current question
    questionEl.textContent = currQuestion.question;
    // build answers for this question
    for (var i = 0; i < currQuestion.answers.length; i++) {
        var option = document.createElement("li");
        option.innerHTML = `<button>${currQuestion.answers[i]}</button>`;

        //  when option is clicked, check correctness and display the next question
        nextQuestionHandler(option, qIndex, correctAns);
        answerListEl.appendChild(option);
    }
};

/* when an option button is clicked, it will increment score accordingly, and
   then call displayQuestion(qIndex + 1) unless the quiz is over. */
var nextQuestionHandler = function(option, qIndex, correctAns) {
    option.addEventListener("click", function() {
        // check if this answer is correct. If not, subtract 3 seconds from the timer.
        if (option.textContent === correctAns) {
            score++;
        }
        else {
            timer -= 3;
        }

        // display the next question or end the quiz
        if (qIndex < questions.length - 1) {
            return displayQuestion(qIndex + 1);
        }
        else {
            // if no questions remain, the countdown() function will end the quiz
            quizFinished = true;
        }
    });
};


/* decrement timer by 1 every 1000 ms. End the quiz when prompted. If the timer
   reaches zero, end the Quiz regardless of how many questions were answered. */
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
            timerEl.textContent = 0;
            clearInterval(timeInterval);
            return endQuiz();
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
    timeBonusEl.textContent = Math.max(timer, 0); // change negative timer to 0
    scoreEl.textContent = score * 100 + Math.max(timer, 0);
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