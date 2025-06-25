var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];

var level = 0;
var started = false;
$(document).keydown( function (event) {
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    } 
});

$(".btn").click(function () {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function () {
                    nextSequence();
                }, 1000);
            }
            console.log("SUCCESS");
        } else {
            playSound("wrong");
            $("body").addClass("game-over").delay(100).queue(function() {
                $(this).removeClass("game-over").dequeue();
            });
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#" + randomChoosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
    
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed").delay(100).queue(function(){
        $(this).removeClass("pressed").dequeue();
    }); 
}
