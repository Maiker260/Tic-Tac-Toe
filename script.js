
function gameBoard() {

    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j; j < columns; j++) {
            board[i] = board.push(cell())
            console.log(board)
            console.table(board)
        }
    }
    
    const dropToken = (column, player) => {
        const availableCells = board.filter((row) => row[column].getValue() === 0).map(row => row[column]);

        if (!availableCells.length) return;

        // Otherwise, I have a valid cell, the last one in the filtered array
        const lowestRow = availableCells.length - 1;
        board[lowestRow][column].addToken(player);
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
      };

    return {
        dropToken,
        printBoard
    }

}

function cell() {

    let value = 0;

    const addMarker = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        addMarker,
        getValue
    }
}


function displayController(player1 = "Player One", player2 = "Player Two") {

    const board = gameBoard();

    const players = [
        {
            name: player1,
            marker: 1
        },
        {
            name: player2,
            marker: 2,
        }
    ]



    let activePlayer = players[0];

    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };




    const playRound = (column) => {
        // Drop a token for the current player
        console.log( `Dropping ${getActivePlayer().name}'s token into column ${column}...`);
        board.dropToken(column, getActivePlayer().marker);

        /*  This is where we would check for a winner and handle that logic,
            such as a win message. */

        // Switch player turn
        switchPlayerTurn();
        printNewRound();
    };

    // Initial play game message
    printNewRound();

    // For the console version, we will only use playRound, but we will need
    // getActivePlayer for the UI version, so I'm revealing it now
    return {
        playRound,
        getActivePlayer
    };

}