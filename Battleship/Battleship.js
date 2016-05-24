/**
 * Created by darcyl4380 on 5/18/2016.
 */


battleship();

function battleship()
{
    var boardSize = 10;
    var numShips = 5;
    var shipLength = [2, 3, 3, 4, 5];
    var shipsSunk = 0;

    var userOneBoard = {board : new Array(),
                        carrier : new Array(),
                        battleship: new Array(),
                        destroyer : new Array(),
                        submarine : new Array(),
                        patrol_boat : new Array(),
    };

    var userTwoBoard = {board : new Array(),
                        carrier : new Array(),
                        battleship: new Array(),
                        destroyer : new Array(),
                        submarine : new Array(),
                        patrol_boat : new Array(),
    };

    var singleplayer = true;

    for (var x = 0; x < boardSize; x++){
        userOneBoard.board[x] = new Array();
        userTwoBoard.board[x] = new Array();
        for (var d = 0; d < boardSize; d++){
            userOneBoard.board[x][d] = 0;
            userTwoBoard.board[x][d] = 0;

        }
    }

    var shipsArray = ["Carrier", "Battleship", "Destroyer", "Submarine", "Patrol Boat"];

    for (var y = 0; y < 5; y++){

        var questionStr = "What ship do you want to place down:";

        for(var z = 0; z < shipsArray.length; z++){
            questionStr += "\n" + (z + 1) + ". " + shipsArray[z];
        }

        var shipNum = 0;

        var query = require('cli-interact').getYesNo;
        var answer = query('Is it true');
        console.log('you answered:', answer);

        shipsArray.splice(shipNum - 1, 1);
    }


    function user_guess(guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);

            if (ship.hits[index] === "hit") {
                view.displayMessage("Oops, you already hit that location.");
                return true;
            } else if (index <= 0) {
                ships.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");

                if (this.isSunk(ship)) {
                    view.displayMessage("You sank my battleship!");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You Missed");
        return false;
    }

    function shipIsSunk(ship) {
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    }

    function generateLocation() {
        var locations;
        for (var i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while (this.collision(locations));
            this.ships[i].locations = locations;
        }
    }

    function generateShip() {
        var direction = Math.floor((Math.random() * 2));
        var row, col;

        if (direction === 1) {
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
        }
        else {
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
            col = Math.floor(Math.random() * this.boardSize);
        }

        var newShipLocations = [];

        for (var i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            } else {
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    }

    function overlap(locations) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            for (var j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    }
}

    var view = {
    displayMessage: function(msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};

var controller = {
    guesses: 0,

    processGuess: function(guess) {
        var location = parseGuess(guess);

        if(location) {
            this.guesses++;
            var hit = model.fire(location);
            if(hit && model.shipsSunk === model.numShips) {
                view.displayMessage("You sank all my battleships, in " +
                    this.guesses + " guesses");
            }
        }
    }
};

function parseGuess(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

    if(guess === null || guess.length !== 2) {
        alert("Oops, please enter a letter and a number on the baord.")
    } else {
        
    }
}