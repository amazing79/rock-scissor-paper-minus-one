let userChoices = [];
let machineChoices = [];

let userScore = 0;
let machineScore = 0;

function showGameScreen() {
    document.getElementById('initial-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
}

function showRules() {
    const rulesDialog = document.getElementById('rules-dialog');
    rulesDialog.showModal();
}

function closeRules() {
    const rulesDialog = document.getElementById('rules-dialog');
    rulesDialog.close();
}

function selectOption(option) {
    if (userChoices.length < 2 && !userChoices.includes(option)) {
        userChoices.push(option);
    }

    if (userChoices.length === 2) {
        showResultScreen();
    }
}

function getRandomOptions() {
    const options = ['Piedra', 'Papel', 'Tijera'];
    let choices = [];
    while (choices.length < 2) {
        const randomOption = options[Math.floor(Math.random() * options.length)];
        if (!choices.includes(randomOption)) {
            choices.push(randomOption);
        }
    }
    return choices;
}

function showResultScreen() {
    machineChoices = getRandomOptions();
    document.getElementById('game-screen').classList.add('hidden');

    const resultScreen = document.getElementById('result-screen');
    resultScreen.classList.remove('hidden');

    const userIcons = {
        'Piedra': '<i class="fas fa-hand-rock"></i>',
        'Papel': '<i class="fas fa-hand-paper"></i>',
        'Tijera': '<i class="fas fa-hand-scissors"></i>'
    };

    const machineIcons = userIcons;

    document.getElementById('machine-row').innerHTML = machineChoices.map(choice =>
        `<div class='choice' onclick='finalizeMachineChoice("${choice}")'>${machineIcons[choice]}</div>`).join('');
    document.getElementById('user-row').innerHTML = userChoices.map(choice =>
        `<div class='choice' onclick='finalizeUserChoice("${choice}")'>${userIcons[choice]}</div>`).join('');
}

function updateScore(winner) {
    if (winner === 'user') {
        machineScore++;
    } else if (winner === 'machine') {
        userScore++;
    }
    document.getElementById('user-score').textContent = `Usuario: ${userScore}`;
    document.getElementById('machine-score').textContent = `Máquina: ${machineScore}`;
}

function checkGameOver() {
    return (userScore >= 5) || (machineScore >= 5);
}

function resetGame() {
    const dialog = document.getElementById('result-dialog');
    dialog.close();
    userChoices = [];
    machineChoices = [];
    userScore = 0;
    machineScore = 0;
    document.getElementById('user-score').textContent = `Usuario: ${userScore}`;
    document.getElementById('machine-score').textContent = `Máquina: ${machineScore}`;
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('initial-screen').classList.remove('hidden');
}

function finalizeUserChoice(choice) {
    userChoices = [choice];
    document.querySelectorAll('#user-row .choice').forEach(el => {
        if (!el.innerHTML.includes(choice)) {
            el.classList.add('hidden');
        }
    });
    finalizeMachineChoice();
}

function finalizeMachineChoice() {
    const finalChoice = machineChoices[Math.floor(Math.random() * machineChoices.length)];
    machineChoices = [finalChoice];
    document.querySelectorAll('#machine-row .choice').forEach(el => {
        if (!el.innerHTML.includes(finalChoice)) {
            el.classList.add('hidden');
        }
    });
    showFinalResult();
}

function showFinalResult() {
    const userChoice = userChoices[0];
    const machineChoice = machineChoices[0];

    const outcomes = {
        'Piedra': { 'Piedra': 'Empate', 'Papel': 'Perdiste', 'Tijera': 'Ganaste' },
        'Papel': { 'Piedra': 'Ganaste', 'Papel': 'Empate', 'Tijera': 'Perdiste' },
        'Tijera': { 'Piedra': 'Perdiste', 'Papel': 'Ganaste', 'Tijera': 'Empate' }
    };

    const result = outcomes[userChoice][machineChoice];

    if (result === 'Ganaste') {
        updateScore('user');
    } else if (result === 'Perdiste') {
        updateScore('machine');
    }

    let btn = '<button onclick="resetRound()">Continuar</button>';
    if(checkGameOver()) {
        btn = '<button onclick="resetGame()">Finalizar</button>';
    } 
    const dialog = document.getElementById('result-dialog');
    dialog.innerHTML = result === 'Ganaste' ? '<p>¡Felicitaciones, ganaste!</p>' : result === 'Perdiste' ? '<p>¡Sos un gil, te gané!</p>' : '<p>¡Es un empate!</p>';
    dialog.innerHTML += btn;
    dialog.showModal();
}

function resetRound() {
    const dialog = document.getElementById('result-dialog');
    dialog.close();
    userChoices = [];
    machineChoices = [];
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
}
