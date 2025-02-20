let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
    let randomNum = Math.floor(Math.random() * 3);

    if (randomNum == 0) {
        return "rock"
    } else if (randomNum == 1) {
        return "paper"
    } else {
        return "scissors"
    }
}

function getPlayerChoice() {
    while (true) {
        let input = prompt("Please enter Rock, Paper, or Scissors").toLowerCase();

        if (input != "rock" && input != "paper" && input != "scissors") {
            alert("Invalid choice! Try again.")
            continue
        } else {
            return input
        }
    }
}

let = playerChoice = getPlayerChoice()

console.log(playerChoice)