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
    let gameboard = [];
    let gameboardSize = 3;
    let turn = player1;

    for (let i = 0; i < gameboardSize * gameboardSize; i++){gameboard.push('e');}

    const checkStatus = ()  => {
        for (let i = 0; i < gameboardSize; i++){
            if ((gameboard[i] === gameboard[i+gameboardSize] && gameboard[i+gameboardSize] === gameboard[i+(gameboardSize * 2)]) && gameboard[i] != 'e'){
                return 'win';
            }
            else if ((gameboard[gameboardSize * i] === gameboard[gameboardSize * i + 1] && gameboard[gameboardSize * i + 1] === gameboard[gameboardSize * i + 2]) && gameboard[gameboardSize * i] != 'e'){
                return 'win';
            }
            else if ((gameboard[i] === gameboard[gameboardSize + 1] && gameboard[gameboardSize + 1] === gameboard[gameboardSize * 2 + 2]) && gameboard[i] != 'e'){
                return 'win';
            }
            else if ((gameboard[gameboardSize-1] === gameboard[gameboardSize + 1] && gameboard[gameboardSize + 1] === gameboard[gameboardSize * 2]) && gameboard[gameboardSize-1] != 'e'){
                return 'win';
            }
            if (gameboard.find(e => e === 'e') === undefined){
                return 'draw';
            }            
        }
        return 'continue';
    };

    const checkCell = (position) => {
        return gameboard[position] === 'e';
    }

    const markCell = (position) => {
        gameboard[position] = turn;
        if (turn === player1){turn=player2}
        else ( turn=player1 );
    }

    const getTurn = () => {
        return turn;
    }
    
    const printBoard = () => {
        gameboard.forEach(element => {
            console.log(element);
        });
    }

    return {checkStatus, markCell, checkCell, getTurn, printBoard};
}

const Player = (name) => {
    const getName  = () => name;

    return {getName};
}

let board, status;

document.addEventListener('click',function(e){
    if (e.target && e.target.id==='pvp'){
        const mode = document.querySelector('.select-mode');
        mode.remove();
        board = Gameboard('X','O');
    }
    else if (e.target && e.target.className==='cell'){
        let cellPosition = e.target.id.replace('cell-','');
        if (board.checkCell(cellPosition)){
            let actualPlayer = board.getTurn();
            e.target.textContent = actualPlayer;
            board.markCell(cellPosition);  
            if (board.checkStatus() === 'win'){
                const board = document.querySelector('.board');
                board.innerHTML = `<div><h1>${actualPlayer} Win!</h1><button>Play Again</button></div>`
                board.style = 'display:flex; justify-content:center; align-items:center;';
            }
            else if (board.checkStatus() === 'draw'){
                const board = document.querySelector('.board');
                board.innerHTML = `<div><h1>It's a draw</h1><button>Play Again</button></div>`
                board.style = 'display:flex; justify-content:center; align-items:center;';
            }
        }
    }
})


