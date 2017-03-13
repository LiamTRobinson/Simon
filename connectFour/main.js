const GameData = {
//this is all of the game data.  gameboard records player positions. player turn marks the current player. current tile stores the clicked tile id for
//functions. gameon defines whether or not the game is running. player(x)score keeps score data. aigame defines whether the ai is running or not. clicktile checks
//to see if the ai successfully clicked a tile.
	gameBoard: [["p0","p0","p0","p0","p0","p0"],["p0","p0","p0","p0","p0","p0"],["p0","p0","p0","p0","p0","p0"],["p0","p0","p0","p0","p0","p0"],["p0","p0","p0","p0","p0","p0"],["p0","p0","p0","p0","p0","p0"],["p0","p0","p0","p0","p0","p0"]],
	playerTurn: "p1",
	currentTile: "",
	gameOn: false,
	playerOneScore: 0,
	playerTwoScore: 0,
	AIGame: false,
	clickTile: false,
//these functions are small and explicit in their use. they only manipulate the above data.
	clickTileTrue: function() {
		this.clickTile = true;
	},
	clickTileFalse: function() {
		this.clickTile = false;
	},
	playerChange: function() {
		if (this.playerTurn === "p1"){
			this.playerTurn = "p2";
		}
		else {
			this.playerTurn = "p1";
		}
	},
	changeGameBoard: function(player, xValue, yValue) {
		this.gameBoard[xValue][yValue] = player;
	},
	resetGameBoard: function() {
		for (var i = 0; i < this.gameBoard.length; i++){
			for (var j = 0; j < this.gameBoard[i].length; j++) {
				this.gameBoard[i][j] = "p0";
			}
		}
	},
	changeCurrentTile: function(tile) {
		this.currentTile = tile;
	},
	startGame: function() {
		this.gameOn = true;
	},
	endGame: function() {
		this.gameOn = false;
		if (this.playerTurn === "p1") {
			this.playerOneScore += 1;
		}
		else {
			this.playerTwoScore += 1;
		}
		ViewControl.updateScores();
	},
	startAIGame: function() {
		this.AIGame = true;
	},
	endAIGame: function() {
		this.AIGame = false;
	},
	clearPlayerScores: function() {
		this.playerOneScore = 0;
		this.playerTwoScore = 0;
	}
};

const AppControl = {
//this changes the value of a certain string in a certain array in the game board using currenttile data.
	updateGameBoard: function() {
		var xValue = GameData.currentTile.slice(0, 1);
		var yValue = GameData.currentTile.slice(1);
		GameData.changeGameBoard(GameData.playerTurn, xValue, yValue);
	},
//these all check if there are four of a kind in a column, row, increasing right diagonal, and increasing left diagonal.
	checkColumn: function() {
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				if (j < 3 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i][j+1] && GameData.gameBoard[i][j] === GameData.gameBoard[i][j+2] && GameData.gameBoard[i][j] === GameData.gameBoard[i][j+3]){
					ViewControl.displayModal();
					GameData.endGame();
					GameData.endAIGame();
					return;
				}
			}
		}
	},
	checkRow: function() {
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				if (i < 4 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i+1][j] && GameData.gameBoard[i][j] === GameData.gameBoard[i+2][j] && GameData.gameBoard[i][j] === GameData.gameBoard[i+3][j]){
					ViewControl.displayModal();
					GameData.endGame();
					GameData.endAIGame();
					return;
				}
			}
		}
	},
	checkRightDiagonal: function() {
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				if (i < 4 && j < 3 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i+1][j+1] && GameData.gameBoard[i][j] === GameData.gameBoard[i+2][j+2] && GameData.gameBoard[i][j] === GameData.gameBoard[i+3][j+3]){
					ViewControl.displayModal();
					GameData.endGame();
					GameData.endAIGame();
					return;
				}
			}
		}
	},
	checkLeftDiagonal: function() {
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				if (i > 2 && j < 3 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i-1][j+1] && GameData.gameBoard[i][j] === GameData.gameBoard[i-2][j+2] && GameData.gameBoard[i][j] === GameData.gameBoard[i-3][j+3]){
					ViewControl.displayModal();
					GameData.endGame();
					GameData.endAIGame();
					return;
				}
			}
		}
	}
};

const ViewControl = {
//this is a function to create the game board, each piece having a unique id based on it's position in the matrix.
	makeBoard: function() {
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {

				$("#column-"+i).append("<div class='p0' id="+i+j+"></div>");
			}
		}
	},
//this changes the clicked tile's class and puts its id in the current tile data.
	changeTile: function(x) {
		var children = $(x).children();
		for (var i = 0; i < children.length; i++) {
			if (children.eq(i).attr("class") === "p0") {
				children.eq(i).attr("class", GameData.playerTurn);
				GameData.changeCurrentTile(children.eq(i).attr("id"));
				return;
			}
		}
	},
//this changes the scores on the dom
	updateScores: function() {
		$("#player-one-score").html(GameData.playerOneScore);
		$("#player-two-score").html(GameData.playerTwoScore);
	},
//this hides the game over modal
	hideModal: function() {
		$("#modal").css("display", "none");
	},
//this displays the game over modal
	displayModal: function() {
		$("#winner").html($("#"+GameData.playerTurn).html().slice(0, $("#"+GameData.playerTurn).html().length-1));
		$("#modal").css("display", "flex");
	},
};

const AI = {
//this is a really long function that I want to improve that runs the ai for single player.
	runAI: function() {
		GameData.clickTileFalse();
//this checks the right side of a row
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				//if there is three of a kind in a row
				if (i < 4 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i+1][j] && GameData.gameBoard[i][j] === GameData.gameBoard[i+2][j]){
					//if the right side is open
					if (GameData.gameBoard[i+3][j] === "p0") {
						//if it is on the bottom row
						if (j === 0){
							EventHandlers.clickTile("#column-"+(i+3));
							if (GameData.clickTile === true){
								console.log("right row 3");
								return;
							}
						}
						//if it is not on the bottom row and the column is high enough
						else if (GameData.gameBoard[i+3][j-1] !== "p0") {
							EventHandlers.clickTile("#column-"+(i+3));
							if (GameData.clickTile === true){
								console.log("right row 3");
								return;
							}
						}
					}
				}
			}
		}
//this checks the left side of a row
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				//if there is three of a kind
				if (i > 2 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i-1][j] && GameData.gameBoard[i][j] === GameData.gameBoard[i-2][j]){
					//if the left side is open
					if (GameData.gameBoard[i-3][j] === "p0") {
						//if it is on the bottom row
						if (j === 0){
							EventHandlers.clickTile("#column-"+(i-3));
							if (GameData.clickTile === true){
								console.log("left row 3");
								return;
							}
						}
						//if it is not on the bottom row and the column is high enough
						else if (GameData.gameBoard[i-3][j-1] !== "p0") {
							EventHandlers.clickTile("#column-"+(i-3));
							if (GameData.clickTile === true){
								console.log("left row 3");
								return;
							}
						}
					}
				}
			}
		}
//this checks the bottom left to top right diagnonal
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				//if there are three of a kind
				if (i < 4 && j < 3 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i+1][j+1] && GameData.gameBoard[i][j] === GameData.gameBoard[i+2][j+2]){
					//if the right side is open
					if (GameData.gameBoard[i+3][j+3] === "p0"){
						//if the column is high enough
						if (GameData.gameBoard[i+3][j+2] !== "p0") {
							EventHandlers.clickTile("#column-"+(i+3));
							if (GameData.clickTile === true){
								console.log("bottom left to top right 3");
								return;
							}
						}
					}
				}
			}
		}
//this checks the top left to bottom right diagnonal
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				//if there are three of a kind
				if (i < 4 && j > 2 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i+1][j-1] && GameData.gameBoard[i][j] === GameData.gameBoard[i+2][j-2]){
					//if the right side is open
					if (GameData.gameBoard[i+3][j-3] === "p0"){
						//if the right side is the bottom row
						if (j - 3 === 0) {
							EventHandlers.clickTile("#column-"+(i+3));
							if (GameData.clickTile === true){
								console.log("top left to bottom right 3");
								return;
							}
						}
						//if the column is high enough
						else if (GameData.gameBoard[i+3][j-4] !== "p0") {
							EventHandlers.clickTile("#column-"+(i+3));
							if (GameData.clickTile === true){
								console.log("top left to bottom right 3");
								return;
							}
						}
					}
				}
			}
		}
//this checks the bottom right to top left diagonal
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				//this checks for three of a kind
				if (i > 2 && j < 3 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i-1][j+1] && GameData.gameBoard[i][j] === GameData.gameBoard[i-2][j+2]){
					//if the left side is open
					if (GameData.gameBoard[i-3][j+3] === "p0"){
						//if the column is high enough
						if (GameData.gameBoard[i-3][j+2] !== "p0"){
							EventHandlers.clickTile("#column-"+(i-3));
							if (GameData.clickTile === true){
								console.log("bottom right to top left 3");
								return;
							}
						}
					}
				}
			}
		}
//this checks the top right to bottom left diagonal
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				//this checks for three of a kind
				if (i > 2 && j > 2 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i-1][j-1] && GameData.gameBoard[i][j] === GameData.gameBoard[i-2][j-2]){
					//if the left side is open
					if (GameData.gameBoard[i-3][j-3] === "p0"){
						//if the left side is on the bottom row
						if (j - 3 === 0) {
							EventHandlers.clickTile("#column-"+(i-3));
							if (GameData.clickTile === true){
								console.log("top right to bottom left 3");
								return;
							}
						}
						//if the column is high enough
						else if (GameData.gameBoard[i-3][j-4] !== "p0"){
							EventHandlers.clickTile("#column-"+(i-3));
							if (GameData.clickTile === true){
								console.log("top bottom to left bottom 3");
								return;
							}
						}
					}
				}
			}
		}
//this checks columns
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				//this checks for three of a kind
				if (j < 3 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i][j+1] && GameData.gameBoard[i][j] === GameData.gameBoard[i][j+2]) {
					//if the spot is open
					if (GameData.gameBoard[i][j+3] === "p0") {
						EventHandlers.clickTile("#column-"+i);
						if (GameData.clickTile === true){
							console.log("column 3");
							return;
						}
					}
				}
			}
		}
//this checks the right side of a row
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				//this checks for two of a kind
				if (i < 5 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i+1][j]){
					//if the right side is open
					if (GameData.gameBoard[i+2][j] === "p0"){
						//if it is on the bottom row
						if (j === 0) {
							EventHandlers.clickTile("#column-"+(i+2));
							if (GameData.clickTile === true){
								console.log("right row 2");
								return;
							}
						}
						//if the column is high enough
						else if (GameData.gameBoard[i+2][j-1] !== "p0") {
							EventHandlers.clickTile("#column-"+(i+2));
							if (GameData.clickTile === true){
								console.log("right row 2");
								return;
							}
						}
					}
				}
			}
		}
//this checks the left side of a row
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				//this checks for two of a kind
				if (i > 1 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i-1][j]){
					//if the left side is open
					if (GameData.gameBoard[i-2][j] === "p0"){
						//if it is on the bottom row
						if (j === 0) {
							EventHandlers.clickTile("#column-"+(i-2));
							if (GameData.clickTile === true){
								console.log("left row 2");
								return;
							}
						}
						//if the column is high enough
						else if (GameData.gameBoard[i-2][j-1] !== "p0") {
							EventHandlers.clickTile("#column-"+(i-2));
							if (GameData.clickTile === true){
								console.log("left row 2");
								return;
							}
						}
					}
				}
			}
		}
//this checks the column
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				//this checks for two of a kind
				if (j < 4 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i][j+1]) {
					//if the spot is open
					if (GameData.gameBoard[i][j+2] === "p0") {
						EventHandlers.clickTile("#column-"+i);
						if (GameData.clickTile === true){
							console.log("column 2");
							return;
						}
					}
				}
			}
		}
//this checks the bottom left to top right
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				//this checks for two of a kind
				if (i < 5 && j < 2 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i+1][j+1]){
					//if the spot is open
					if (GameData.gameBoard[i+2][j+2] === "p0"){
						//if the column is high enough
						if (GameData.gameBoard[i+2][j+1] !== "p0"){
							EventHandlers.clickTile("#column-"+(i+2));
							if (GameData.clickTile === true){
								console.log("bottom left to top right 2");
								return;
							}
						}
					}
				}
			}
		}
//this checks the top left to bottom right diagnonal
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				//if there are two of a kind
				if (i < 5 && j > 1 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i+1][j-1]){
					//if the right side is open
					if (GameData.gameBoard[i+2][j-2] === "p0"){
						//if the right side is the bottom row
						if (j - 2 === 0) {
							EventHandlers.clickTile("#column-"+(i+2));
							if (GameData.clickTile === true){
								console.log("top left to bottom right 3");
								return;
							}
						}
						//if the column is high enough
						else if (GameData.gameBoard[i+2][j-3] !== "p0") {
							EventHandlers.clickTile("#column-"+(i+2));
							if (GameData.clickTile === true){
								console.log("top left to bottom right 3");
								return;
							}
						}
					}
				}
			}
		}
//this checks the bottom right to top left
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				//this checks for two of a kind
				if (i > 1 && j < 4 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i-1][j+1]){
					//if the spot is open
					if (GameData.gameBoard[i-2][j+2] === "p0") {
						//if the column is high enough
						if (GameData.gameBoard[i-2][j+1] !== "p0") {
							EventHandlers.clickTile("#column-"+(i-2));
							if (GameData.clickTile === true){
								console.log("bottom right to top left 2");
								return;
							}
						}
					}
				}
			}
		}
//this checks the top right to bottom left diagonal
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				//this checks for two of a kind
				if (i > 1 && j > 1 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i-1][j-1]){
					//if the left side is open
					if (GameData.gameBoard[i-2][j-2] === "p0"){
						//if the left side is on the bottom row
						if (j - 2 === 0) {
							EventHandlers.clickTile("#column-"+(i-2));
							if (GameData.clickTile === true){
								console.log("top right to bottom left 3");
								return;
							}
						}
						//if the column is high enough
						else if (GameData.gameBoard[i-2][j-3] !== "p0"){
							EventHandlers.clickTile("#column-"+(i-2));
							if (GameData.clickTile === true){
								console.log("top bottom to left bottom 3");
								return;
							}
						}
					}
				}
			}
		}
//this applies a random selection given no better options
		var r = Math.floor(Math.random()*7);
		EventHandlers.clickTile("#column-"+r);
		if (GameData.clickTile === true){
			console.log("random");
			return;
		}
		else {
			this.runAI();
		}
	},
};

const EventHandlers = {
//this is everything that happens when a column is clicked.
	clickTile: function(x) {
		if (GameData.gameOn === true) {	
			var xValue = $(x).attr("id").slice($(x).attr("id").length-1);
			var newArray= [];
			for (var i = 0; i < GameData.gameBoard[xValue].length; i++){
				if (GameData.gameBoard[xValue][i] === "p0") {
					newArray.push("p0");
				}
			}
			if (newArray.length !== 0) {
				ViewControl.changeTile(x);
				GameData.clickTileTrue();
				AppControl.updateGameBoard();
				AppControl.checkColumn();
				AppControl.checkRow();
				AppControl.checkRightDiagonal();
				AppControl.checkLeftDiagonal();
				GameData.playerChange();
				if (GameData.AIGame === true && GameData.playerTurn === "p2") {
					AI.runAI();
				}
			}
		}
	},
//this is everything needed to start a new two player game
	newGame: function() {
		if (GameData.gameOn === false) {
			GameData.resetGameBoard();
			$(".column").children().attr("class", "p0");
			GameData.startGame();
		}
	},
//this is everything needed to start a new one player game
	newAIGame: function() {
		if (GameData.gameOn === false) {
			GameData.resetGameBoard();
			$(".column").children().attr("class", "p0");
			GameData.startGame();
			GameData.startAIGame();
			if (GameData.playerTurn === "p2"){
				AI.runAI();
			}
		}
	},
//these change player names on the dom
	getPlayerOneName: function() {
		$("#p1").html($("#p-one-name").val()+":");
		$("#p-one-name").val("");
	},

	getPlayerTwoName: function() {
		$("#p2").html($("#p-two-name").val()+":");
		$("#p-two-name").val("");
	},
//this clears both scores
	clearScores: function() {
		$("#player-two-score").html("0");
		$("#player-one-score").html("0");
		GameData.clearPlayerScores();
	}
};
//this ties all of our click events to the dom and makes the game board on load
$(function() {
	ViewControl.makeBoard();
	$("#clear-scores").on("click", EventHandlers.clearScores);
	$("#close-modal").on("click", ViewControl.hideModal);
	$("#new-ai-game").on("click", EventHandlers.newAIGame);
	$(".column").on("click", function(){EventHandlers.clickTile(this)});
	$("#new-game").on("click", EventHandlers.newGame);
	$("#p-one-submit").on("click", EventHandlers.getPlayerOneName);
	$("#p-two-submit").on("click", EventHandlers.getPlayerTwoName);
});	