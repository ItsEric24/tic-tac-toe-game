const players = ["X", "O"];
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.getElementsByClassName("cell");
const boardElement = document.getElementById("board");
const restartButton = document.getElementById("restart-button");
let currentPlayer = players[0];
let gameState = "active";
const endMessage = document.createElement("h2");
endMessage.textContent = "X's turn!";
endMessage.style.marginTop = "30px";
endMessage.style.textAlign = "center";
boardElement.after(endMessage);

function checkWin(currentPlayer) {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    if (
      cellElements[a].textContent === currentPlayer &&
      cellElements[b].textContent === currentPlayer &&
      cellElements[c].textContent === currentPlayer
    ) {
      gameState = "ended";
      return true;
    }
  }
}

function checkTie() {
  for (let i = 0; i < cellElements.length; i++) {
    if (cellElements[i].textContent === "") {
      return false;
    }
  }
  return true;
}

function restartGame() {
  for (let i = 0; i < cellElements.length; i++) {
    cellElements[i].textContent = "";
  }
  endMessage.textContent = "X's turn";
  currentPlayer = players[0];
  gameState = "active";
}

for (let i = 0; i < cellElements.length; i++) {
  cellElements[i].addEventListener("click", () => {
    if (cellElements[i].textContent !== "" || gameState === "ended") {
      return;
    }

    cellElements[i].textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
      endMessage.textContent = `Game Over, ${currentPlayer} wins`;
      return;
    }

    if (checkTie()) {
      endMessage.textContent = "Game is a tie";
      return;
    }

    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    if (currentPlayer === players[0]) {
      endMessage.textContent = "X's turn!";
    } else {
      endMessage.textContent = "O's turn!";
    }
  });
}
