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

function playRound(playerChoice, computerChoice) {
    let playerWinMessage = "Congratulations, Player! You win!";
    let computerWinMessage = "Bad luck, Player! You lose";

    if (playerChoice == computerChoice) {
        console.log(`You chose ${playerChoice}!`)
        console.log(`The computer chose ${computerChoice}!`)
        console.log("It's a draw! Play again");
    } else if (playerChoice == "rock" && computerChoice == "paper") {
        computerScore++
        console.log(`You chose ${playerChoice}!`)
        console.log(`The computer chose ${computerChoice}!`)
        console.log(computerWinMessage);
        console.log(`The scores are: Player ${playerScore} - ${computerScore} Computer`)
    } else if (playerChoice == "rock" && computerChoice == "scissors") {
        playerScore++
        console.log(`You chose ${playerChoice}!`)
        console.log(`The computer chose ${computerChoice}!`)
        console.log(playerWinMessage);
        console.log(`The scores are: Player ${playerScore} - ${computerScore} Computer`)
    } else if (playerChoice == "paper" && computerChoice == "rock") {
        playerScore++
        console.log(`You chose ${playerChoice}!`)
        console.log(`The computer chose ${computerChoice}!`)
        console.log(playerWinMessage);
        console.log(`The scores are: Player ${playerScore} - ${computerScore} Computer`)
    } else if (playerChoice == "paper" && computerChoice == "scissors") {
        computerScore++
        console.log(`You chose ${playerChoice}!`)
        console.log(`The computer chose ${computerChoice}!`)
        console.log(computerWinMessage);
        console.log(`The scores are: Player ${playerScore} - ${computerScore} Computer`)
    } else if (playerChoice == "scissors" && computerChoice == "rock") {
        computerScore++
        console.log(`You chose ${playerChoice}!`)
        console.log(`The computer chose ${computerChoice}!`)
        console.log(computerWinMessage);
        console.log(`The scores are: Player ${playerScore} - ${computerScore} Computer`)
    } else if (playerChoice == "scissors" && computerChoice == "paper") {
        playerScoreScore++
        console.log(`You chose ${playerChoice}!`)
        console.log(`The computer chose ${computerChoice}!`)
        console.log(playerWinMessageWinMessage);
        console.log(`The scores are: Player ${playerScore} - ${computerScore} Computer`)
    } else {
        console.log("Hmm, something's wrong...")
    }
}

function playGame() {
    let roundCount = 1;

    while (roundCount <= 5) {
        let playerChoice = getPlayerChoice();
        let computerChoice = getComputerChoice();

        playRound(playerChoice, computerChoice);

        roundCount++
    }

    console.log("That's the end of the game!")
    console.log(`The scores are: Player ${playerScore} - ${computerScore} Computer`)

    if (playerScore > computerScore) {
        console.log("Congratulations, Player! You beat the machine")
    } else if (computerScore > playerScore) {
        console.log("Bad luck, Player! Another win for the machines")
    } else {
        console.log("A draw! Rematch pending...")
    }
}

// let i = 0

// while (i <= 5) {
//     playRound(getPlayerChoice(), getComputerChoice());
//     i++
// }

