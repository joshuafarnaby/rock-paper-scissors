const gameLaunchModal = document.querySelector("#game-launch-container");
const roundResultModal = document.querySelector("#round-result-container");
const gameOverModal = document.querySelector("#game-over-container");

const roundSelectBtns = document.querySelectorAll(".round-select-btn");
const playGameBtn = document.querySelector("#play-game-btn");

const playerChoiceBtns = document.querySelectorAll(
  ".rps-select-container button"
);

const quitGameBtn = document.querySelector("#quit-btn");
const continueBtn = document.querySelector("#continue-btn");
const homeBtn = document.querySelector("#home-btn");
const replayBtn = document.querySelector("#replay-btn");

let currentRoundResult;
let currentRound;
let maxRounds;

let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
  let randomNum = Math.floor(Math.random() * 3);

  if (randomNum == 0) {
    return "rock";
  } else if (randomNum == 1) {
    return "paper";
  } else {
    return "scissors";
  }
}

function getRoundResult(playerChoice, computerChoice) {
  if (playerChoice == computerChoice) return "draw";

  if (playerChoice == "rock") {
    if (computerChoice == "paper") return "computer";
    if (computerChoice == "scissors") return "player";
  } else if (playerChoice == "paper") {
    if (computerChoice == "rock") return "player";
    if (computerChoice == "scissors") return "computer";
  } else {
    if (computerChoice == "rock") return "computer";
    if (computerChoice == "paper") return "player";
  }
}

function updateResultModal(playerChoice, computerChoice, currentRoundResult) {
  document.querySelector("#player-choice-text").textContent = playerChoice;
  document.querySelector("#computer-choice-text").textContent = computerChoice;

  document.querySelector(
    "#player-choice-img"
  ).src = `./icons/${playerChoice}.svg`;
  document.querySelector(
    "#computer-choice-img"
  ).src = `./icons/${computerChoice}.svg`;

  if (currentRoundResult == "draw") {
    document.querySelector("#round-winner-text").textContent = "it's a draw!";
  } else {
    document.querySelector(
      "#round-winner-text"
    ).textContent = `the ${currentRoundResult} wins this round!`;
  }
}

function toggleResultModal() {
  if (roundResultModal.classList.contains("hidden")) {
    roundResultModal.classList.remove("hidden");
    roundResultModal.classList.add("reveal");
  } else {
    roundResultModal.classList.remove("reveal");
    roundResultModal.classList.add("hidden");
  }
}

function toggleGameLaunchModal() {
  if (gameLaunchModal.classList.contains("hidden")) {
    gameLaunchModal.classList.remove("hidden");
    gameLaunchModal.classList.add("reveal");
  } else {
    gameLaunchModal.classList.remove("reveal");
    gameLaunchModal.classList.add("hidden");
  }
}

function toggleGameOverModal() {
  if (gameOverModal.classList.contains("hidden")) {
    gameOverModal.classList.remove("hidden");
    gameOverModal.classList.add("reveal");
  } else {
    gameOverModal.classList.remove("reveal");
    gameOverModal.classList.add("hidden");
  }
}

function resetGame() {
  roundSelectBtns.forEach((btn) => btn.classList.remove("select"));
  playGameBtn.classList.add("inactive");

  currentRound = 1;
  playerScore = 0;
  computerScore = 0;
}

roundSelectBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    roundSelectBtns.forEach((btn) => btn.classList.remove("select"));
    e.target.classList.add("select");
    playGameBtn.classList.remove("inactive");

    document.querySelector("#total-rounds").textContent = e.target.value;
    maxRounds = e.target.value;
  });
});

playGameBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("inactive")) return;

  currentRound = 1;

  document.querySelector("#current-round").textContent = currentRound;

  toggleGameLaunchModal();
});

playerChoiceBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let playerChoice = e.target.parentElement.value;
    let computerChoice = getComputerChoice();
    currentRoundResult = getRoundResult(playerChoice, computerChoice);

    updateResultModal(playerChoice, computerChoice, currentRoundResult);
    toggleResultModal();
  });
});

quitGameBtn.addEventListener("click", () => {
  toggleResultModal();
  toggleGameLaunchModal();
  resetGame();
});

homeBtn.addEventListener("click", () => {
  toggleGameOverModal();
  toggleGameLaunchModal();
  resetGame();
});

replayBtn.addEventListener("click", () => {
  toggleGameOverModal();

  playerScore = 0;
  computerScore = 0;
  currentRound = 1;

  document.querySelector("#player-score").textContent = playerScore;
  document.querySelector("#computer-score").textContent = computerScore;
  document.querySelector("#current-round").textContent = currentRound;
});

continueBtn.addEventListener("click", () => {
  if (currentRoundResult == "draw") {
    toggleResultModal();
    return;
  }

  if (currentRoundResult == "player") {
    playerScore += 1;
    document.querySelector("#player-score").textContent = playerScore;
  } else if (currentRoundResult == "computer") {
    computerScore += 1;
    document.querySelector("#computer-score").textContent = computerScore;
  }

  if (currentRound == maxRounds) {
    toggleResultModal();
    toggleGameOverModal();
    const winnerText = document.querySelector("#winner");

    document.querySelector("#player-final").textContent = playerScore;
    document.querySelector("#computer-final").textContent = computerScore;

    winnerText.textContent =
      playerScore > computerScore ? "player" : "computer";
  } else {
    currentRound += 1;
    document.querySelector("#current-round").textContent = currentRound;
    toggleResultModal();
  }
});
