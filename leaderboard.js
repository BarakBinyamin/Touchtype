// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBGhJg8p2dVjgeLmBPaZkk0aOLFA3jeqB0",
    authDomain: "touchtype-leaderboard.firebaseapp.com",
    databaseURL: "https://touchtype-leaderboard.firebaseio.com",
    projectId: "touchtype-leaderboard",
    storageBucket: "touchtype-leaderboard.appspot.com",
    messagingSenderId: "1077436955334",
    appId: "1:1077436955334:web:2bb45d3b3c73164ecdb5c7",
    measurementId: "G-0NN3FSVQ90"
};

// Initialize Firebase, make a reference variable 
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var Player="";

//add a grouping of data to the database
function push_group() {
    var query = firebase.database().ref("User").orderByKey();
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key; // key will change every iteration
                var childData = childSnapshot.val();
                var path = "/User/" + key;
                if (childData.name == Player) {
                    database.ref(path).set({
                        name: Player,
			date: day,
                        scoreOne: HighScore1,
	   	        scoreTwo:  HighScore2,
	    		scoreThree: HighScore3,
                    });
                }

            });
        });

}


function reload_content() {
    var leaderboard = "<h1>LEADERBOARD</h1><table style='width:100%'>";
    push_group();
    /**these two lines of javascript are key to iterating through the database**/
    firebase.database().ref("User").on('value', function (snap) {
        snap.forEach(function (childNodes) {

            //This loop iterates over children of user_id
            //childNodes.key is key of the children of userid such as (20170710)
            name = childNodes.val().name;
            scoreOne = childNodes.val().scoreOne;
	    scoreTwo = childNodes.val().scoreTwo;
	    scoreThree = childNodes.val().scoreThree;
            //add the data into your preset html wrapper, be sure to escape special characters
            if (name != " ") {
                leaderboard += "<tr>\r\n  " +
                    "<th>" + String(name) + "<\/th>\r\n " +
                    "<th>" + String(scoreOne) + "<\/th> \r\n " +
		    "<th>" + String(scoreTwo) + "<\/th>\r\n " +
		    "<th>" + String(scoreThree) + "<\/th>\r\n <\/tr>\r\n";
            }


        }); 
    });

    document.getElementById("leaderboard").innerHTML = leaderboard;
}


var intervalvar;
var Tdate = new Date();
var day = Tdate.getDate();
function reload_content_timer() {
    intervalVar = setInterval(function () {
        reload_content();
    }, 3000);
}

//original push location 

//clear the textboxes
function clear_textbox() {
    document.getElementById("message").innerHTML = "";
}



var found=false;
function Sign_up() {
    found = false;

    
    Player = document.getElementById("nameTextbox").value;
    //
    var query = firebase.database().ref("User").orderByKey();
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key; // key will change every iteration
                var childData = childSnapshot.val();
               
                if (childData.name == Player) {
                    document.getElementById("message").innerHTML = "sorry, but that Username is already in use</br></br>";
		setTimeout(function(){ document.getElementById("message").innerHTML = "";}, 2000);
                    found = true;
                }
		//if username out of date --> bump
		if ((String(childData.date) != String(day)) && (childData.name != " ")) {
		    path = "User/" + key
		    console.log(path)
                    database.ref(path).set({});
                }

            });
        });
     setTimeout(function(){ check()}, 1000);
}



function check() {
    if (!found) {
        database.ref("/User").push({
            name: Player,
	    date: day,
	    scoreOne: HighScore1,
	    scoreTwo: HighScore2,
	    scoreThree: HighScore3,
        });
        closeNav();
    }
          console.log(found);
}

//consider > nav.js
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

window.addEventListener('DOMContentLoaded', (event) => {
    reload_content_timer();
    openNav();
});

function startThemeMusic(){
	const audioElementName = "audio"
	const el = document.getElementById(audioElementName)
	el?.play()
}
