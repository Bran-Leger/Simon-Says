var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).keypress(function(){
  if (!started)
  {
  nextSequence();
  started = true;
  }
});

$("button").click(function(){
  var userChosenColor = this.classList[1];
  userClickedPattern.push(userChosenColor);
  // Adding pressed class so it looks like an actual button being pressed
  buttonPress(userChosenColor);
  // Making noise
  makeSound(userChosenColor);
  console.log(userClickedPattern.length-1);
  console.log(userClickedPattern);
  console.log(gamePattern);
  checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
  level++;
  userClickedPattern = [];
  $("h1").text("Level " + level);
  // Random num between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);
  // Grabbing a random color
  var randomChosenColor = buttonColors[randomNumber];
  // Adding random color to game pattern array
  gamePattern.push(randomChosenColor);

  // Delaying the button press for the user's benefit
  setTimeout(function(){
  // Adding pressed class so it looks like an actual button being pressed
  buttonPress(randomChosenColor);
  // Setting sound to corresponding color sounds
  makeSound(randomChosenColor);
  }, 500);
}


function buttonPress(button)
{
  $("." + button).addClass("pressed");
  setTimeout(function(){
    $("." + button).removeClass("pressed");
  }, 100);
}

function makeSound(sound)
{
  var audio = new Audio(sound + ".mp3");
  audio.play();
}

function checkAnswer(currentArrayItem){
  if (userClickedPattern[currentArrayItem] === gamePattern[currentArrayItem])
  {
    if (userClickedPattern.length === gamePattern.length)
    {
      nextSequence();
    }
  }
  else
  {
    makeSound("wrong");
    $("h1").text("Game Over. Press a key to restart.");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },500);
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
