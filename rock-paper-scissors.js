const options = ["Rock", "Paper", "Scissors"]

function capitalise (string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
function getComputerChoice () {
    let randomIdx = Math.floor(Math.random() * 3);
    
    return options[randomIdx];
}

function playRound(playerSelection, computerSelection) {
    if (computerSelection === playerSelection) {
        return ["It's a draw! Nobody wins.", 0 ,0];
    } else {
        if ((computerSelection === 'Rock' & playerSelection === 'Paper') ||
            (computerSelection === 'Paper' & playerSelection === 'Scissors') ||
            (computerSelection === 'Scissors' & playerSelection === 'Rock')) {
            return [`You win! ${playerSelection} beats ${computerSelection}.`, 1, 0];
        } else {
            return [`You lose! ${computerSelection} beats ${playerSelection}.`, 0 ,1];
        }
    }
}

function game (ngames=5) {
    let playerSelection;
    let computerSelection;

    for (let i = 0; i < ngames; i++) {
        playerSelection = capitalise(prompt("Choose an option (rock, paper or scissors): "));

        while (options.indexOf(playerSelection) === -1) {
            playerSelection = prompt("Choose an option (rock, paper or scissors): ");
        }

        computerSelection = getComputerChoice();

        console.log(playRound(playerSelection, computerSelection)[0]);
    }
}
