const gameLaunchModal = document.querySelector("#game-launch-container");
const roundResultModal = document.querySelector("#round-result-container");
const gameOverModal = document.querySelector("#game-over-container");

const roundSelectBtns = document.querySelectorAll(".round-select-btn");
const playGameBtn = document.querySelector("#play-game-btn");

const playerChoiceBtns = document.querySelectorAll(
  ".rps-select-container button"
);

const homeBtn = document.querySelector("#home-btn");
const quitGameBtn = document.querySelector("#quit-btn");
const continueBtn = document.querySelector("#continue-btn");

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
  // toggleResultModal()
  toggleGameLaunchModal();
  resetGame();
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

  // currentRound += 1;
  // document.querySelector("#current-round").textContent = currentRound;
  // toggleResultModal();
});

// let playerScore = 0;
// let computerScore = 0;

// function getPlayerChoice() {
//   while (true) {
//     let input = prompt("Please enter Rock, Paper, or Scissors").toLowerCase();

//     if (input != "rock" && input != "paper" && input != "scissors") {
//       alert("Invalid choice! Try again.");
//       continue;
//     } else {
//       return input;
//     }
//   }
// }

// function playRound(playerChoice, computerChoice) {
//   let playerWinMessage = "Congratulations, Player! You win!";
//   let computerWinMessage = "Bad luck, Player! You lose";

//   if (playerChoice == computerChoice) {
//     console.log(`You chose ${playerChoice}!`);
//     console.log(`The computer chose ${computerChoice}!`);
//     console.log("It's a draw! Play again");
//   } else if (playerChoice == "rock" && computerChoice == "paper") {
//     computerScore++;
//     console.log(`You chose ${playerChoice}!`);
//     console.log(`The computer chose ${computerChoice}!`);
//     console.log(computerWinMessage);
//     console.log(
//       `The scores are: Player ${playerScore} - ${computerScore} Computer`
//     );
//   } else if (playerChoice == "rock" && computerChoice == "scissors") {
//     playerScore++;
//     console.log(`You chose ${playerChoice}!`);
//     console.log(`The computer chose ${computerChoice}!`);
//     console.log(playerWinMessage);
//     console.log(
//       `The scores are: Player ${playerScore} - ${computerScore} Computer`
//     );
//   } else if (playerChoice == "paper" && computerChoice == "rock") {
//     playerScore++;
//     console.log(`You chose ${playerChoice}!`);
//     console.log(`The computer chose ${computerChoice}!`);
//     console.log(playerWinMessage);
//     console.log(
//       `The scores are: Player ${playerScore} - ${computerScore} Computer`
//     );
//   } else if (playerChoice == "paper" && computerChoice == "scissors") {
//     computerScore++;
//     console.log(`You chose ${playerChoice}!`);
//     console.log(`The computer chose ${computerChoice}!`);
//     console.log(computerWinMessage);
//     console.log(
//       `The scores are: Player ${playerScore} - ${computerScore} Computer`
//     );
//   } else if (playerChoice == "scissors" && computerChoice == "rock") {
//     computerScore++;
//     console.log(`You chose ${playerChoice}!`);
//     console.log(`The computer chose ${computerChoice}!`);
//     console.log(computerWinMessage);
//     console.log(
//       `The scores are: Player ${playerScore} - ${computerScore} Computer`
//     );
//   } else if (playerChoice == "scissors" && computerChoice == "paper") {
//     playerScoreScore++;
//     console.log(`You chose ${playerChoice}!`);
//     console.log(`The computer chose ${computerChoice}!`);
//     console.log(playerWinMessageWinMessage);
//     console.log(
//       `The scores are: Player ${playerScore} - ${computerScore} Computer`
//     );
//   } else {
//     console.log("Hmm, something's wrong...");
//   }
// }

// function playGame() {
//   let roundCount = 1;

//   while (roundCount <= 5) {
//     let playerChoice = getPlayerChoice();
//     let computerChoice = getComputerChoice();

//     playRound(playerChoice, computerChoice);

//     roundCount++;
//   }

//   console.log("That's the end of the game!");
//   console.log(
//     `The scores are: Player ${playerScore} - ${computerScore} Computer`
//   );

//   if (playerScore > computerScore) {
//     console.log("Congratulations, Player! You beat the machine");
//   } else if (computerScore > playerScore) {
//     console.log("Bad luck, Player! Another win for the machines");
//   } else {
//     console.log("A draw! Rematch pending...");
//   }
// }
// let i = 0

// while (i <= 5) {
//     playRound(getPlayerChoice(), getComputerChoice());
//     i++
// }
