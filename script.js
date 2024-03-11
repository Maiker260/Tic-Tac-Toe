function gameBoard() {

    const rows = 3;
    const columns = 3;
    const board = [];


    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j; j < columns; j++) {
            board[i] = board.push(cell())
        }
    }


}


function cell() {

    let value = 0;

    const addToken = (player) => {
        value = player;
    }

    const getCurrentValue = () => value;

    return {
        addToken, 
        getCurrentValue
    }

}