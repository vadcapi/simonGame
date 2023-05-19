var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var level=0;
var started=false;

$(document).keydown(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

function nextSequence(){
    userClickedPattern=[];

    randomNumber=Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    $("#level-title").text("Level "+level)

    level++;
}
$(".btn").click(function(button){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
}
)

function playSound(name) {
    audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed")
    }, 100)
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
            audio = new Audio("sounds/success.mp3");
            audio.play();
            }, 500);
            setTimeout(function(){
                nextSequence();
            }, 2000);
        }
    }
    else {

        audio = new Audio("sounds/wrong.mp3");
        audio.play();
        level=0;
        gamePattern=[];

        $("#level-title").addClass("bonzo");
        $(".cont").removeClass("hide"); 

        setTimeout(function(){
            $("#level-title").removeClass("bonzo");
            $(".cont").addClass("hide");
            
        }, 150);        
        
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}
function startOver(params) {
    level=0;
    started=false;
    gamePattern=[];
}
