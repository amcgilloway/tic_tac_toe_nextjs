import { useState, useEffect } from "react";

export default function Home() {

  const [xTurn, setXTurn] = useState(true);
  const [boardData, setBoardData] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: ""
  });

  const [won, setWon] = useState(false);
  const [draw, setDraw] = useState(false);
  const [winningLine, setWinningLine] = useState([]);
  const [modalTitle, setModalTitle] = useState("");

  const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  useEffect(() => {
    const isWon = checkWinner();
    checkDraw(isWon);

  }, [boardData])

  const updateBoardData = (idx) => {
    if (!boardData[idx]) {
      let value = xTurn === true ? "X" : "O";
      setBoardData({ ...boardData, [idx]: value });
      setXTurn(!xTurn);
    }
  };

  const checkDraw = (isWon) => {
    let check = Object.keys(boardData).every((v) => boardData[v]);

    if (check && !isWon) setDraw(check);
    if (check) setModalTitle("Match Draw!!!");

  };

  const checkWinner = () => {
    let isWon = false;
    winningCombo.map((lineCoords) => {
      const [square1, square2, square3] = lineCoords;
      if (
        boardData[square1] &&
        boardData[square1] === boardData[square2] &&
        boardData[square1] === boardData[square3]
      ) {
        setWon(true);
        setWinningLine(lineCoords)
        setModalTitle(`Player ${!xTurn ? "X" : "O"} Won!!!`);
        isWon = true;
      }
    });
    return isWon;

  }

  const reset = () => {
    setBoardData({
      0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "",
    });
    setXTurn(true);
    setWon(false);
    setWinningLine([]);
    setDraw(false);
    setModalTitle("");
  };

  return (
    <div>
      <div className={`modal ${modalTitle ? "show" : ""}`}>
        <div className="modal-title">{modalTitle}</div>
        <button onClick={reset}>New Game</button>
      </div>
      <h1>Tic Tac Toe</h1>
      <div className="game">
        <div className="game-menu">
          <p>{xTurn === true ? "X Turn" : "O Turn"}</p>
          <p>{`Game Won:${won}| Game Draw: ${draw}`}</p>
        </div>
        <div className='game-board'>
          {[...Array(9)].map((v, idx) => {
            return (
              <div key={idx} className={winningLine.includes(idx) ? 'square winner' : 'square'} onClick={() => { updateBoardData(idx) }}>
                {boardData[idx]}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
