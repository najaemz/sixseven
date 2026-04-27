var mode = "visual";
var seq = [
    { s: [2, 4, 6, 8, 10, 12, 14] },
    { s: [1, 1, 2, 3, 5, 8, 13] },
    { s: [3, 9, 27, 81, 243, 729, 2187] },
    { s: [5, 10, 20, 40, 80, 160, 320] },
    { s: [1, 4, 9, 16, 25, 36, 49] },
    { s: [10, 8, 6, 4, 2, 0, -2] },
    { s: [2, 6, 7, 21, 22, 66, 67] },
    { s: [1, 3, 6, 10, 15, 21, 28] },
    { s: [100, 90, 80, 70, 60, 50, 40] },
    { s: [1, 2, 4, 7, 11, 16, 22] }
];

var order = [];
var curr = 0;
var iX = 0;
var correctAnswer = 0;
var score = 0;

var displaySequence = [];
var hideIndex = 0;
var timerId = null;

document.getElementsByClassName("js-restart")[0].addEventListener("click", function(){
    document.getElementsByClassName("js-gameOver")[0].close();
    start();
});

start();

function start(){
    initialize();
    updateScore();
    nextRound();
}

function initialize(){
    mode = "visual";
    order = shuffle();
    curr = 0;
    score = 0;
    clearInterval(timerId);
}

function shuffle(){
    var arr = [];
    for(var i=0;i<seq.length;i++) arr.push(i);

    for(var i=arr.length-1;i>0;i--){
        var j = Math.floor(Math.random()*(i+1));
        var t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
    }

    if(order.length > 0 && arr[0] === order[order.length-1]){
        var temp = arr[0];
        arr[0] = arr[1];
        arr[1] = temp;
    }

    return arr;
}

function nextRound(){
    prepareSequence();
    showSequence();
    player();
}

function prepareSequence(){
    var sequence = seq[order[curr]].s.slice();

    iX = Math.floor(Math.random()*(sequence.length-1)) + 1;
    correctAnswer = sequence[iX];
    sequence[iX] = "x";

    displaySequence = sequence.slice();
    hideIndex = 0;

    renderSequence();
}

function renderSequence(){
    document.getElementsByClassName("show-sequence")[0].innerHTML =
        "<p>" + displaySequence.join(", ") + "</p>";
}

function showSequence(){
    mode = "visual";
    document.getElementsByClassName("js-feedback")[0].innerHTML = "";
    generateOptions();
}

function player(){
    mode = "player";
    controlarMemoria();
}

function generateOptions(){
    var options = [correctAnswer];

    while(options.length < 4){
        var fake = correctAnswer + Math.floor(Math.random()*10) - 5;
        if(!options.includes(fake)) options.push(fake);
    }

    for(var i=options.length-1;i>0;i--){
        var j = Math.floor(Math.random()*(i+1));
        var t = options[i];
        options[i] = options[j];
        options[j] = t;
    }

    var html = "";
    for(var i=0;i<options.length;i++)
        html += "<button class='js-option' data='" + options[i] + "'>" + options[i] + "</button>";

    document.getElementsByClassName("js-answers")[0].innerHTML = html;

    var buttons = document.getElementsByClassName("js-option");
    for(var i=0;i<buttons.length;i++)
        buttons[i].addEventListener("click", checkAnswer);
}

function controlarMemoria(){
    var rodada = curr;
    clearInterval(timerId);

    timerId = setInterval(function(){
        if(curr != rodada) return;

        if(hideIndex < displaySequence.length){
            if(displaySequence[hideIndex] !== "x"){
                displaySequence[hideIndex] = "_";
                renderSequence();
            }
            hideIndex++;
        } else{
            clearInterval(timerId);
            endGame();
        }
    },1000);
}

function checkAnswer(e){
    if(mode != "player") return;

    clearInterval(timerId);

    var value = Number(e.target.getAttribute("data"));

    if(value == correctAnswer){
        score++;
        updateScore();
        document.getElementsByClassName("js-feedback")[0].innerHTML = "<p>Correct!</p>";

        curr++;
        if(curr >= seq.length){
            order = shuffle();
            curr = 0;
        }

        setTimeout(nextRound, 500);
    } else endGame();
}

function updateScore(){
    document.getElementsByClassName("js-score")[0].innerHTML = "Score: " + score;
}

function endGame(){
    clearInterval(timerId);
    document.getElementsByClassName("js-final-score")[0].innerHTML = "Final Score: " + score;
    document.getElementsByClassName("js-gameOver")[0].showModal();
}