const GameData = {
	gameBoard: [["p0","p0","p0","p0","p0","p0"],["p0","p0","p0","p0","p0","p0"],["p0","p0","p0","p0","p0","p0"],["p0","p0","p0","p0","p0","p0"],["p0","p0","p0","p0","p0","p0"],["p0","p0","p0","p0","p0","p0"],["p0","p0","p0","p0","p0","p0"]],
	playerTurn: "p1",
	currentTile: "",

	playerChange: function() {
		if (this.playerTurn === "p1"){
			this.playerTurn = "p2";
		}
		else {
			this.playerTurn = "p1";
		}
	},
	playerReset: function() {
		this.playerTurn = "p1";
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
	clearCurrentTile: function() {
		this.currentTile = "";
	}
};

const AppControl = {

};

const ViewControl = {
	makeBoard: function() {
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				$("#column-"+i).append("<div class='p0' id="+i+j+"></div>");
			}
		}
	},
	changeTile: function(x) {
		var children = $(x).children();
		for (var i = 0; i < children.length; i++) {
			if (children.eq(i).attr("class") === "p0") {
			children.eq(i).attr("class", "p1");
			GameData.currentTile = children.eq(i).attr("id");
			return;
			}
		}
	}
};

const EventHandlers = {

};


$(function() {
	ViewControl.makeBoard();
	$(".column").on("click", function(){ViewControl.changeTile(this)});

});