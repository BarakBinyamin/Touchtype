GlobalLetter = "A";
HighScore = 0;
HighScore1 = 0;
HighScore2 = 0;
HighScore3 = 0;
Score = 0;
background="#333";
mode=0; //aka 1 minute, 2 minute or 3 minute
refreshLetter();

function refreshLetter(){
    GlobalLetter = String.fromCharCode(65+Math.floor(Math.random() * 26));
    document.getElementById("letter").innerHTML = GlobalLetter;
}


function AddScore(){
    Score= Score + 1;
    if (Score>HighScore){
        HighScore = HighScore + 1;
	if (mode==1 && Score>HighScore1){HighScore1 = HighScore1 +1;}
    	else if (mode==2 && Score>HighScore2){HighScore2 = HighScore2 + 1}
    	else if (mode==3 && Score>HighScore3){HighScore3 = HighScore3 + 1}
    }

    document.getElementById("score").innerHTML = "Score: " + Score + " " + "High Score: " + HighScore;
}

function ZeroScore(){
    Score = 0;
    document.getElementById("score").innerHTML = "Score: " + Score + " " + "High Score: " + HighScore;
}

document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.which || evt.keyCode;
    var charStr = String.fromCharCode(charCode);
    if (charStr.toUpperCase() == GlobalLetter){
        FlashBackground("green");
        refreshLetter();
        console.log("Well done! The global letter is now: " + GlobalLetter.toUpperCase());
        AddScore();
    }
    else{
        FlashBackground("red");
        ZeroScore();
    }

};

function FlashBackground(color){
    document.body.style.background = color;
    setTimeout(function(){ document.body.style.transition = "background 500ms"; }, 50);
    setTimeout(function(){ document.body.style.background = background; }, 100);
    setTimeout(function(){ document.body.style.transition = ""; }, 200);
}


function ChangeTheme(){
    if ( document.body.className == "default" ){ document.body.className= "night"; background="#333" }
    else{ document.body.className =  "default"; background="#fff"}
}


var timer = false;
var timeCounter = 0;
var intervalVar;

function startTimer(){

    console.log("new");
    intervalVar = setInterval(function() {

        var hours = Math.floor(timeCounter / 60 / 60);
        var minutes = Math.floor(timeCounter / 60) - (hours * 60);
        var seconds = timeCounter % 60;


        timeCounter--;
        if (timeCounter >= 0) {
            span = document.getElementById("count");
            span.innerHTML = "Time left: " + minutes + ":"
            if (seconds<10){ span.innerHTML += "0" + seconds;}else{span.innerHTML +=seconds;}
        }

        if (timeCounter == -1) {
            clearInterval(intervalVar);
            timer = false;
            span = document.getElementById("count");
            span.innerHTML = "Time left: " + minutes + ":" + "0" + seconds;
	    mode=0;
        }

    }, 1000);

}

function Quit_(){
    if (timer) {
        timer = false;
        clearInterval(intervalVar); mode=0;}
}

function Timer_(time){
    if (timer==false) {
        timer = true;
        timeCounter = time;
        startTimer();
    var prev_mode = mode;
    if (time==60){mode=1}
    else if (time==120){mode=2}
    else if (time==180){mode=3}
    if(prev_mode != mode){HighScore=0; Score=0;}
    }

    else {
        timer = false;
        clearInterval(intervalVar);
        Timer_(time);}
}
