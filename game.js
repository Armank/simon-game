var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var gameStarted = false;

var level = 0;

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

$(document).keydown(function(event) {
  if(gameStarted == false){
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}

function animatePress(currentColor) {
  var element = $("#" + currentColor);
  element.addClass("pressed");
  setTimeout(function() {
    element.removeClass("pressed");
  }, 100);
}
