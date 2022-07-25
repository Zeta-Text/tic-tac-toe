

//module - gameboard, displayController
var gameController = (function() {
    let gameBoard = [];
    let player1Array = []
    let player2Array = []
    let counter = 0;
    let turnCounter = 1;
    let p1Name = "";
    let p2Name = "";
  
    return {
      fillBoard: function() {

        let empty = {player: "", selection: "", cellID: ""}
        for (i = 0; i < 9; i++) {
            gameBoard.push(empty);
            console.log(gameBoard)
        } 
      },
      renderBoard: function() {
        const boardcontainer = document.querySelector('#boardcontainer');        
        boardcontainer.innerText = ""
        counter = 0;
        gameBoard.forEach((element) => {  
            const boardcontainer = document.querySelector('#boardcontainer');
            const button = document.createElement('button')
            button.innerText = element.selection;
            button.setAttribute = ("id", "button")
            button.classList.add('button');
            button.type = "button"; 
            button.name = "submitBtn";
            button.value = counter;
            boardcontainer.appendChild(button)
            counter++;
            let combinedArrays = player1Array.concat(player2Array);
            button.addEventListener("click", function() {
              if (!combinedArrays.includes(button.value)) {
                  gameController.turnSystem(button.value);
              }                    
              });
            
        });
      },
      checkWinner: function() {
        //console.log(gameBoard)
        let winningCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]];
      
      let sortPlayer1 = player1Array.sort(function(a, b) {
        return a - b;
      });

      let sortPlayer2 = player2Array.sort(function(a, b) {
        return a - b;
      });
      
      for (let i = 0; i < winningCombinations.length; i++) {
        let stringedCombo = winningCombinations[i].toString().split("");
        let stringedPlayer1 = sortPlayer1.toString();
        let stringedPlayer2 = sortPlayer2.toString();

        //console.log(stringedCombo)
        //console.log(stringedPlayer1)
        //console.log(stringedPlayer2)

        let containsWinningCombo1 = stringedCombo.every((c) =>
            stringedPlayer1.includes(c)
        );

        let containsWinningCombo2 = stringedCombo.every((c) =>
            stringedPlayer2.includes(c)
        );


        if (containsWinningCombo1) {
          console.log("player 1 win!");
          this.winningMessage(p1Name + " wins!")
          this.fillBoard()
          this.renderBoard()
          
        } else if (containsWinningCombo2) {
          console.log("player2 win!")
          this.winningMessage(p2Name + " wins!")
          this.fillBoard()
          this.renderBoard()
          

        } else if (turnCounter == 9) {
          console.log("its a tie") 
          this.winningMessage("It's a tie!")
          this.fillBoard()
          this.renderBoard()
          
          
        }
      }
      
      },
      addMark: function(player, selection, cellID) {
        let playerSelection = {player: player, selection: selection, cellID: cellID};
 
        gameBoard.splice(cellID, 1, playerSelection); 
        this.renderBoard();
        this.checkWinner();

      },
      turnSystem: function(cellID) {
        
        if (turnCounter % 2 == 0) {
          player2Array.push(cellID)
          this.addMark(p2Name, "O", cellID);
          turnCounter++;
         // console.log(turnCounter)   

        } else {
          player1Array.push(cellID)
          this.addMark(p1Name, "X", cellID);
          turnCounter++;
         // console.log(turnCounter)
            
        }
      },
      winningMessage: function(message) {
        gameBoard = [];
        player1Array = []
        player2Array = []
        counter = 0;
        turnCounter = 0;
        

        let overlay = document.createElement('div')
        overlay.id = "overlay"
        document.body.appendChild(overlay)
        
        const winPopUp = document.createElement('div');
        winPopUp.id = "popup"
        overlay.appendChild(winPopUp)
        
        
        const popUpControls = document.createElement('div');
        winPopUp.appendChild(popUpControls)
        
        const popUpClose = document.createElement('button')
        popUpClose.innerText = "X"
        popUpClose.id = "popupclose"
        popUpControls.appendChild(popUpClose);

        const popUpContent = document.createElement('div');
        popUpContent.innerText = message;
        winPopUp.appendChild(popUpContent)

        popUpClose.addEventListener("click", function() {
              overlay.remove()
          });

      },
      startDisplay: function() {

        let paper = document.createElement("div");
        paper.id = "paper"
        document.body.appendChild(paper);

        let pattern = document.createElement("div");
        pattern.id = "pattern";
        paper.appendChild(pattern);

        let pageCover = document.createElement('div');
        pageCover.id = "pageCover"
        //document.body.appendChild(pageCover);
        pageCover.innerText = "Tic Tac Toe!";
        pattern.appendChild(pageCover)



        const messageContainer = document.createElement('div');
        messageContainer.id = "messageContainer"
        //messageContainer.innerText = "Tic Tac Toe!;"
        pageCover.appendChild(messageContainer);

        const name1Container = document.createElement("div");
        name1Container.id = "name1Container";
        messageContainer.appendChild(name1Container)

        const textBox1 = document.createElement("span");
        textBox1.innerText = "Player 1 Name";
        textBox1.id = "textBox1";
        name1Container.appendChild(textBox1)

        const p1NameInput = document.createElement("input");
        p1NameInput.setAttribute("type", "text");
        p1NameInput.id = "p1NameInput";
        p1NameInput.value = "Player 1"
        name1Container.appendChild(p1NameInput)

        const name2Container = document.createElement("div");
        messageContainer.appendChild(name2Container);
        name2Container.id = "name2Container";


        const textBox2 = document.createElement("span");
        textBox2.innerText = "Player 2 Name";
        textBox2.id = "textBox2";
        name2Container.appendChild(textBox2)
        
        const p2NameInput = document.createElement("input");
        p2NameInput.setAttribute("type", "text");
        name2Container.appendChild(p2NameInput);
        p2NameInput.value = "Player 2"
        p2NameInput.id = "p2NameInput";

        const buttonContainer = document.createElement("div");
        buttonContainer.id = "buttonContainer";
        messageContainer.appendChild(buttonContainer);

        const startButton = document.createElement("button");
        startButton.id = "startButton"
        startButton.innerText = "Start";
        buttonContainer.appendChild(startButton);

        startButton.addEventListener("click", function() {
          p1Name = p1NameInput.value;
          p2Name = p2NameInput.value;

          pageCover.remove();
          
        });

        const header = document.getElementById("header");
        const headerText = document.createElement("div");
        headerText.innerText = "Tic Tac Toe!";
        headerText.id = "headerText"
        header.appendChild(headerText);

        const resetButton = document.createElement("button");
        const resetContainer = document.createElement("div");
        resetButton.innerText = "Reset";
        resetButton.id = "resetButton";
        header.appendChild(resetContainer)
        resetContainer.appendChild(resetButton);

        const p1cont = document.createElement("div");
        p1cont.id = "p1cont";
        p1cont.innerText = p1NameInput.value;
        resetContainer.appendChild(p1cont);
        const p2cont = document.createElement("div");
        p2cont.id = "p2cont";
        p2cont.innerText = p2NameInput.value;
        resetContainer.appendChild(p2cont);



        
        resetButton.addEventListener("click", function() {
          gameBoard = [];
          player1Array = []
          player2Array = []
          counter = 0;
          turnCounter = 0;
          
          gameController.fillBoard()
          gameController.renderBoard()


        });

      }
    };
})();

gameController.startDisplay();
gameController.fillBoard();
gameController.renderBoard();


//factory - players
const newPlayer = (player, selection, cellID) => {
    
    return { player, selection, cellID };
  };
  

  