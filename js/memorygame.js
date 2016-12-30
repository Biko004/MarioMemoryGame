var s;
var chosenCard = 0;
var backCard = "url(./images/sideA1.jpg)";
var trueChoice = 0;
var steps = 0;
var gamePaused = false;



function createBoard(){


    var container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("game");

    for (var i=0; i<3; i++){
        var row = document.createElement("div");
        row.classList.add("row");
        for (var j=0; j<4; j++){
            var col = document.createElement("div");
            col.classList.add("col-sm-3", "col-xs-3");
            col.classList.add("card");
            col.classList.add("img");

            col.id = (3*j + i);
            col.style.backgroundImage = backCard;
            col.addEventListener("click", click);
            row.appendChild(col);
        }

        container.appendChild(row);
        container.appendChild(document.createElement('BR'));
    }
    document.body.appendChild(container);

}

function winner() {
    document.getElementById("winnerSound").volume = 0.2;
    document.getElementById("winnerSound").play();


    var popup = document.getElementById("popup");
    $("#popup").click();

    var results = document.getElementById("results");
    results.textContent = "Wrong Guesses: " + steps;


}


function score(){

    wrong.style.display = "inline-block";
    if(steps == 0){
        console.log("started!");
    }
    else{
        wrong.textContent = "WRONG GUESSES: " + steps;
    }



}

// CREATING THE BOARD
createBoard();

score();
// CREATING EMPTY ARRAY FOR IMAGES
var faces = [];

for (var i=0; i<6; i++){
    faces.push("./images/" + (i+1) + ".jpg");
}


// NEW ARRAY OF 2x EACH IMAGE
var selected = [];

//PUSHING EACH IMAGE TWICE
for (var j = 0; j < 6; j++) {
    var randomInd = Math.floor(Math.random(faces.length));
    var face = faces[randomInd];

    selected.push(face);
    selected.push(face);

// REMOVING THE CHOSEN IMAGE FROM THE FACES ARRAY
    faces.splice(randomInd, 1);
}

selected.sort(function() {
    return 0.5 - Math.random();
});



var one;
var two;
function click(e){
    if(!gamePaused && e.target.getAttribute("guessed") != "true"){
        ///change background image!
        e.target.style.backgroundImage = "url(" + selected[e.target.id] + ")";

        if(chosenCard == 0){
            one = e.target;
            chosenCard = 1;
        }
        else{
            two = e.target;
            chosenCard = 2;
            control();
        }

    }

}


function control(){

    if(!gamePaused){
        if(one.style.backgroundImage == two.style.backgroundImage){
            trueChoice++;
            console.log(trueChoice);
            chosenCard = 0;
            one.setAttribute("guessed","true");
            two.setAttribute("guessed","true");
            if(trueChoice<6){
                document.getElementById("levelup").volume = 0.2;
                document.getElementById("levelup").play();

            }


        }
        else if(one.style.backgroundImage != two.style.backgroundImage){
            gamePaused = true;
            setTimeout(function(){
                one.style.backgroundImage = backCard;
                two.style.backgroundImage = backCard;
                gamePaused = false;
                chosenCard = 0;
                steps++;
                console.log("score is " + steps);
                wrong.textContent = "WRONG GUESSES: " + steps;
            },1000);
        }
        if(trueChoice == selected.length/2){
            console.log(("you won!"));
            winner();

        }
    }


}



var reload = function myFunction() {
    location.reload();
};