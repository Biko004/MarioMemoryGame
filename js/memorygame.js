var s;
var chosenCard = 0;
var backCard = "url(./images/sideA1.jpg)";
var trueChoice = 0;
var steps = 0;
var gamePaused = false;
var level = "";
var images = 6;

function levelCheck() {
    $(window).load(function () {
        $('#startgame').modal({
            display: 'show',
            backdrop: 'static',
            keyboard: false  // to prevent closing with Esc button (if you want this too)
        });

    });
};

levelCheck();


function start() {
    if (Math.floor(Math.random() * 2) == 1) {


            var selectedForm = document.forms[0];
            var selectedLevel = "";
            var i;
            for (i = 0; i < selectedForm.length; i++) {
                if (selectedForm[i].checked) {
                    selectedLevel = selectedLevel + selectedForm[i].value;
                }
            }
            console.log(selectedLevel);

            $("#startgame").on('hidden.bs.modal', function () {
                $(this).data('bs.modal', null);
            });
            level = selectedLevel;


            createBoard();
            randomizeImages();

            console.log('success');
            $('#startgame').modal('hide');
            return;

        }
        else {
            alert("Please pick a level.");
            for (var j = 0; j < document.forms["levellist"].length; j++) {
                document.forms["levellist"][j].checked = false;
            }
            console.log('failure');
            return false;
        }

    


}

function createBoard() {


    var container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("game");

    var rows = 4;
    if (level == "rookie") {
        rows = 4;
    }
    else if (level == "intermidate") {
        rows = 6;
    }
    else if (level == "advanced") {
        rows = 8;
    }

    for (var i = 0; i < 3; i++) {
        var row = document.createElement("div");
        row.classList.add("row");
        for (var j = 0; j < rows; j++) {
            var col = document.createElement("div");
            col.classList.add("col-sm-3", "col-xs-3");
            col.classList.add("card");
            col.id = (3 * j + i);
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
    $("#winnerAlert").modal({
        backdrop: 'static',
        keyboard: false
    }).click();

    var results = document.getElementById("results");
    results.textContent = "Wrong Guesses: " + steps;


}


function score() {

    wrong.style.display = "inline-block";
    if (steps == 0) {
        console.log("started!");
    }
    else {
        wrong.textContent = "WRONG GUESSES: " + steps;
    }


}

// CREATING THE BOARD
var faces = [];
for (var i = 0; i <= 24; i++) {
    faces.push("./images/" + (i + 1) + ".jpg");
}
var selected = [];

score();

function randomizeImages() {


    if (level == "rookie") {
        images = 6;
    }
    else if (level == "intermidate") {
        images = 9;
    }
    else if (level == "advanced") {
        images = 12;
    }
    for (var i = 0; i < images; i++) {
        faces.push("./images/" + (i + 1) + ".jpg");
    }


// NEW ARRAY OF 2x EACH IMAGE


//PUSHING EACH IMAGE TWICE
    for (var j = 0; j < images; j++) {
        var randomInd = Math.floor(Math.random(faces.length));

        var face = faces[randomInd];

        selected.push(face);
        selected.push(face);

// REMOVING THE CHOSEN IMAGE FROM THE FACES ARRAY
        faces.splice(randomInd, 1);
    }

    selected.sort(function () {
        return 0.5 - Math.random();
    });
}


var one;
var two;
function click(e) {
    if (!gamePaused && e.target.getAttribute("guessed") != "true") {
        ///change background image!
        e.target.style.backgroundImage = "url(" + selected[e.target.id] + ")";

        if (chosenCard == 0) {
            one = e.target;
            chosenCard = 1;
        }
        else if (one != e.target) {
            two = e.target;
            chosenCard = 2;
            control();
        }

    }

}


function control() {

    if (!gamePaused) {
        if (one.style.backgroundImage == two.style.backgroundImage) {
            trueChoice++;
            console.log(trueChoice);
            chosenCard = 0;
            one.setAttribute("guessed", "true");
            two.setAttribute("guessed", "true");
            if (trueChoice < 6) {
                document.getElementById("levelup").volume = 0.2;
                document.getElementById("levelup").play();

            }


        }
        else if (one.style.backgroundImage != two.style.backgroundImage) {
            gamePaused = true;
            setTimeout(function () {
                one.style.backgroundImage = backCard;
                two.style.backgroundImage = backCard;
                gamePaused = false;
                chosenCard = 0;
                steps++;
                console.log("score is " + steps);
                wrong.textContent = "WRONG GUESSES: " + steps;
            }, 1000);
        }
        if (trueChoice == selected.length / 2) {
            console.log(("you won!"));
            winner();

        }
    }


}


var reload = function myFunction() {
    location.reload();
};