function Square({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

export default function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();

        nextSquares[i] = xIsNext? 'X' : 'O';
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    const isDraw = !winner && squares.every((square) => square !== null);

    const status = winner? 'Winner: ' + winner :
        isDraw? 'Draw!' : 'Next player: ' + (xIsNext ? 'X' : 'O');


    let renderSquares = function (i) {
        let squareRow = [0, 1, 2]
        return <>
            <div className="board-row">
                {squareRow.map((index) => {
                    let squareIndex = i + index;
                    return (
                        <Square value={squares[squareIndex]} onSquareClick={() => handleClick(squareIndex)} />
                    )
                })}
            </div>
        </>
    };


    return (
        <>
            <div className="status">{status}</div>
            {renderSquares(0)}
            {renderSquares(3)}
            {renderSquares(6)}
        </>
    );
}

export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}