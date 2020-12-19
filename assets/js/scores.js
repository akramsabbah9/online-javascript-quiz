/* GLOBALS */
// grab the list of scores and each of the buttons
var scoresListEl = document.querySelector("#scores");;
var backBtnEl = document.querySelector("#go-back");
var clearBtnEl = document.querySelector("#clear");

/* FUNCTIONS */
/* grab scores from localStorage and list them in scoresListEl. */
var loadScores = function() {
    // grab scores from localStorage and put into an array.
    // if null, scores becomes an empty array.
    var scores = JSON.parse(localStorage.getItem("scores")) || [];
    
    // for each member of scores, add a score list item to scoresListEl.
    for (var i = 0; i < scores.length; i++) {
        console.log(scores[i]);
        addScoreEl(scores[i]);
    }
};

/* create a score and append to scoresListEl. */
var addScoreEl = function(scoreObj) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "score-item";
    listItemEl.innerHTML = scoreObj.name + " – " + scoreObj.score;

    scoresListEl.appendChild(listItemEl);
};

/* send user to the main quiz page */
var returnToIndex = function() {
    window.location.href = "./index.html";
};

/* delete all score objects in localStorage; clear scoresListEl and scores array. */
var clearScores = function() {
    localStorage.clear();
    scores = [];
    scoresListEl.innerHTML = "";
};

/* EVENT LISTENERS */
// TODO: REMOVE. This checks if clear button works as intended
// var testStore = [{name: "AS", score: 40}, {name: "TE", score: 22}];
// localStorage.setItem("scores", JSON.stringify(testStore));

backBtnEl.addEventListener("click", returnToIndex);
clearBtnEl.addEventListener("click", clearScores);
loadScores();

/* Akram Sabbah */