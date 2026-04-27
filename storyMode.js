var mode = "visual";
var seq = [
    { s: [2, 4, 6, 8, 10, 12, 14], exp: "Adding 2 each time." },
    { s: [1, 1, 2, 3, 5, 8, 13], exp: "Fibonacci sequence." },
    { s: [3, 9, 27, 81, 243, 729, 2187], exp: "Multiplying by 3." },
    { s: [5, 10, 20, 40, 80, 160, 320], exp: "Multiplying by 2." },
    { s: [1, 4, 9, 16, 25, 36, 49], exp: "Perfect squares." },
    { s: [10, 8, 6, 4, 2, 0, -2], exp: "Subtracting 2." },
    { s: [2, 6, 7, 21, 22, 66, 67], exp: "×3, +1 pattern." },
    { s: [1, 3, 6, 10, 15, 21, 28], exp: "Triangular numbers." },
    { s: [100, 90, 80, 70, 60, 50, 40], exp: "Subtracting 10." },
    { s: [1, 2, 4, 7, 11, 16, 22], exp: "Increasing differences." }
];
var curr = 0;
var iX = 0;
var correctAnswer = 0;
var answered = false;

var inputField = document.getElementsByClassName("js-input")[0];
var submitButton = document.getElementsByClassName("js-submit")[0];
var explainButton = document.getElementsByClassName("js-explain")[0];
var nextButton = document.getElementsByClassName("js-next")[0];

submitButton.addEventListener("click", checkAnswer);
explainButton.addEventListener("click", showExplanation);
nextButton.addEventListener("click", goNext);

inputField.addEventListener("keypress", function(e){
    if(e.key === "Enter") checkAnswer();
});

start();

function start(){
    curr = 0;
    nextRound();
}

function nextRound(){
    if(curr >= seq.length){
        endGame();
        return;
    }

    prepareSequence();
    showSequence();
    playerTurn();
}

function prepareSequence(){
    var sequence = seq[curr].s.slice();

    iX = Math.floor(Math.random() * 5) + 1;
    correctAnswer = sequence[iX];
    sequence[iX] = "x";

    document.getElementsByClassName("show-sequence")[0].innerHTML = "<p>" + sequence.join(", ") + "</p>";
    document.getElementsByClassName("js-counter")[0].innerHTML = (curr + 1) + " / " + seq.length;
}

function showSequence(){
    mode = "visual";
    document.getElementsByClassName("js-feedback")[0].innerHTML = "";
    document.getElementsByClassName("js-explanation-text")[0].innerHTML = "";
    inputField.value = "";
    nextButton.style.display = "none";
}

function playerTurn(){
    mode = "player";
    answered = false;
    inputField.disabled = false;
}

function checkAnswer(){
    if(mode != "player") return;

    var value = inputField.value;

    if(value === "" || !Number.isInteger(Number(value))){
        alert("Please enter a valid integer.");
        return;
    }

    answered = true;

    if(Number(value) === correctAnswer){
        document.getElementsByClassName("js-feedback")[0].innerHTML = "<p>Correct!</p>";
        inputField.disabled = true;
        nextButton.style.display = "block";
        mode = "done";
    } else document.getElementsByClassName("js-feedback")[0].innerHTML = "<p>Wrong! Try again.</p>";
}

function showExplanation(){
    if(!answered){
        alert("Submit an answer first!");
        return;
    }

    document.getElementsByClassName("js-explanation-text")[0].innerHTML = "<p>" + seq[curr].exp + "</p>";
}

function goNext(){
    curr++;
    nextRound();
}

function endGame(){
    document.getElementsByClassName("show-sequence")[0].innerHTML = "<p>You finished all sequences!</p>";
    document.getElementsByClassName("js-counter")[0].innerHTML = "";
    inputField.disabled = true;
    nextButton.style.display = "none";
}