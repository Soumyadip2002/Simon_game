const buttonColors=["red","green","blue","yellow"];
var gamePattern=[];
var userChosenPattern=[];


$('.btn').click(function(){
    var userChosenColour=$(this).attr("id");
    userChosenPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userChosenPattern.length-1);
});


$('.Start').click(function(){
    nextSequence();
    $('.Start').addClass('hide');
});



var started= false;
var level = 0;


$(document).keydown(function(event){
    if(!started){
        nextSequence();
        $('#level-title').text('Level ' + level);
        started=true;
}    
});

function checkAnswer(currentLevel){
    if (userChosenPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("Success");
        if (userChosenPattern.length===gamePattern.length){            
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("Failed");
        playSound("wrong");
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        },300);
        $('h1').text("Game Over, Press Any Key to Restart");
        startOver();
    }
}



function nextSequence(){

    userChosenPattern=[];

    var randomNumber=Math.floor((Math.random()*4)+1)-1;
    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    var randomColour= "#"+randomChosenColour;
    $(randomColour).fadeOut(50).fadeIn(50);
    playSound(randomChosenColour);
    level++;
    $('#level-title').text('Level '+level);
}




// Playing any sound ------>

function playSound(name){
    var audio=new Audio('sounds/'+name+'.mp3');
    audio.play();
}


// Animation of buttons---->

function animatePress(currentColour){
    var buttonPressed="#"+currentColour;
    $(buttonPressed).addClass('pressed');
    setTimeout(() => {
        $(buttonPressed).removeClass('pressed');
    }, 100);
}

// Restarting the game---->

function startOver(){
    gamePattern=[];
    level=0;
    started=false;
    $('.Start').removeClass('hide');
    $('.Start').text("RESTART")
}


function disable(){
    document.getElementsByClassName("Start").disabled = true;
}


