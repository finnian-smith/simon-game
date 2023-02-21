// variables
var gamePattern = [];
var userPattern = [];
var colors = ["green", "red", "yellow", "blue"];
var started = false;
var level = 0;

/**
 *  Listens for key to start game
 */
$(document).on("keydown", function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

/**
 * Executes clicked button animation/sound and checks user pattern against game pattern
 */
$(".btn").click(function () {
  var userColor = $(this).attr("id");
  userPattern.push(userColor);

  animateButton(userColor);
  playSound(userColor);

  checkAnswer(userPattern.length - 1);
});

/**
 * Starts the next sequence of the game
 */
function nextSequence() {
  userPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomColor = Math.floor(Math.random() * 4);
  var color = colors[randomColor];
  gamePattern.push(color);

  animateButton(color);
  playSound(color);
}

/**
 * Plays sound based on the given name (color)
 * @param {string} name - The name of the sound
 */
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

/**
 * Animates button based on given color
 * @param {string} color - The name of the color
 */
function animateButton(color) {
  $("#" + color).addClass("pressed");

  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

/**
 * Checks the user's answer against the game pattern
 * @param {*} currentLevel - The level of the game (zero-indexed)
 */
function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success");

    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").html("Game Over!<br>Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

/**
 * Resets the games variables
 */
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
