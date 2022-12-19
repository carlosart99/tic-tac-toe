//  gameboard object
//  - array with the positions of the players
//  * Check if the game is finish
//  * Check the turns
//  * Restart the game
//
//  Player object
//  - name
//  * Select the spot on his turn

const Gameboard = (player1, player2) => {
    let gameboardSize = 3;
    let turn = player1;
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let player1Wins = 0, player2Wins = 0;
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkStatus = ()  => {
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                if (turn === 'X') {player2Wins+=1;}
                else {player1Wins+=1;}
                return 'win';
            }
        }
        let roundDraw = !gameState.includes("");
        if (roundDraw) {
            return 'draw';
        }        
    };

    const checkCell = (position) => {
        return gameState[position] === '';
    }

    const markCell = (position) => {
        gameState[position] = turn;
        if (turn === player1){turn = player2}
        else { turn=player1 };
    }

    const getTurn = () => {
        return turn;
    }

    const getPlayerScores = () => {
        return [player1Wins, player2Wins];
    }
    
    const printBoard = () => {
        gameState.forEach(element => {
            console.log(element);
        });
    }

    const restart = () => {
        gameState = [];
        gameboardSize = 3, turn = player1;
        gameState = ["", "", "", "", "", "", "", "", ""];
    }

    return {checkStatus, markCell, checkCell, getTurn, printBoard, restart, getPlayerScores};
}

const Player = (name) => {
    const getName  = () => name;

    return {getName};
}

let board, status;

document.addEventListener('click', function(e){
    if (e.target && e.target.id==='pvp'){
        const mode = document.querySelector('.select-mode');
        mode.remove();
        board = Gameboard('X','O');
    }
    else if (e.target && e.target.className==='cell'){
        let cellPosition = e.target.id.replace('cell-','');
        if (board.checkCell(cellPosition)){
            const boardClass = document.querySelector('.turn h2');
            let actualPlayer = board.getTurn();

            boardClass.textContent = actualPlayer === 'X' ? 'Player O' : 'Player X'
            e.target.textContent = actualPlayer;
            board.markCell(cellPosition);

            if (board.checkStatus() === 'win'){
                const boardClass = document.querySelector('.board');
                const player1counter = document.querySelector('#player-1 p');
                const player2counter = document.querySelector('#player-2 p');
                let scores = board.getPlayerScores();
                player1counter.textContent = scores[0];
                player2counter.textContent = scores[1];
                boardClass.innerHTML = `<div class=rslt-board><h1>${actualPlayer} Win!</h1><button id=restart>Play Again</button></div>`
                boardClass.style = 'display:flex; justify-content:center; align-items:center;';
                
            }
            else if (board.checkStatus() === 'draw'){
                const boardClass = document.querySelector('.board');
                boardClass.innerHTML = `<div class=rslt-board><h1>It's a draw</h1><button id=restart>Play Again</button></div>`
                boardClass.style = 'display:flex; justify-content:center; align-items:center;';
            }
        }
    }
    else if (e.target && e.target.id === 'restart'){
        const boardClass = document.querySelector('.board');
        boardClass.innerHTML = `<div class="cell" id="cell-0"></div>
        <div class="cell" id="cell-1"></div>
        <div class="cell" id="cell-2"></div>
        <div class="cell" id="cell-3"></div>
        <div class="cell" id="cell-4"></div>
        <div class="cell" id="cell-5"></div>
        <div class="cell" id="cell-6"></div>
        <div class="cell" id="cell-7"></div>
        <div class="cell" id="cell-8"></div>`
        boardClass.style='grid-row: 3 / 6; display: grid; grid-template-columns: repeat(3,minmax(80px,150px)); grid-template-rows: repeat(3,minmax(80px,150px)); justify-self: center;'
        board.restart();
    }
})


