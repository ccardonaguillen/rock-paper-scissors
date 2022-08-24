// Game logic

const options = ["Rock", "Paper", "Scissors"]

function capitalise (string) {
    // Capitalise first letter of a string
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
function getComputerChoice () {
    // Get random draw from available options
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

/* function game (ngames=5) {
    let playerSelection;
    let computerSelection;

    for (let i = 0; i < ngames; i++) {
        playerSelection =
            capitalise(prompt("Choose an option (rock, paper or scissors): "));

        // Avoid player not selecting a valid option
        while (options.indexOf(playerSelection) === -1) {
            playerSelection =
                prompt("Choose an option (rock, paper or scissors): ");
        }

        computerSelection = getComputerChoice();

        console.log(playRound(playerSelection, computerSelection)[0]);
    }
} */

// UI logic

const buttons = document.querySelectorAll('button')

function connectOptionButtons() {
    buttons.forEach(button => button.addEventListener('click', chooseOption));
}

function chooseOption(e) {
    const playerSelection = capitalise(this.id);
    const computerSelection = getComputerChoice();

    console.log(playerSelection, computerSelection);

    round_score = playRound(playerSelection, computerSelection);
    updateScore(...round_score.slice(1))
}

function updateScore(player, computer) {
    const player_score = document.querySelector('.player-score');
    const computer_score = document.querySelector('.computer-score');

    player_score.textContent = parseInt(player_score.textContent) + player;
    computer_score.textContent = parseInt(computer_score.textContent) + computer;

    if (player_score.textContent === "1") {
        announceWinner("PLAYER");
    } else if (computer_score.textContent === "1") {
        announceWinner("COMPUTER");
    }
}

function announceWinner(winner) {
    const container = document.createElement('div');
    container.classList.add('announcement')

    const message = document.createElement('div')
    message.classList.add('winner')
    message.textContent = `THE ${winner} WINS THE GAME!!!`;
    container.appendChild(message)
    
    buttons.forEach(button => button.removeEventListener('click', chooseOption));

    addResetButton(container);

    const body = document.querySelector('body')
    body.appendChild(container)
}

function addResetButton(parent) {
    const reset_btn = document.createElement('button');
    reset_btn.classList.add("reset-btn");
    reset_btn.textContent = "Reset game";

    parent.appendChild(reset_btn);

    reset_btn.addEventListener('click', resetGame);
}

function resetGame() {
    const announcement = document.querySelector('.winner');
    announcement.textContent = "";

    const reset_btn = document.querySelector(".reset-btn");
    reset_btn.remove()

    const player_score = document.querySelector('.player-score');
    const computer_score = document.querySelector('.computer-score');

    player_score.textContent = 0;
    computer_score.textContent = 0;

    connectOptionButtons()
}

connectOptionButtons()

