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
    checkDraw();
    checkWinner();
  }, [boardData])

  const updateBoardData = (idx) => {
    if (!boardData[idx]){
      let value = xTurn === true ?  "X" : "O";
      setBoardData({...boardData, [idx]: value});
      setXTurn(!xTurn);
    }
  };

  const checkDraw = () => {
    let check = Object.keys(boardData).every((v) => boardData[v]);
    console.log(won);
    if (check && !won) setDraw(check);
  
};

  const checkWinner = () => {
    winningCombo.map((lineCoords) => {
      const [square1, square2, square3] = lineCoords;
      if (
        boardData[square1] &&
        boardData[square1] === boardData[square2] &&
        boardData[square1] === boardData[square3]
      ) {
        setWon(true);
      }
    });
  }

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div className="game">
        <div className="game-menu">
          <p>{xTurn === true? "X Turn" : "O Turn"}</p>
          <p>{`Game Won:${won}| Game Draw: ${draw}`}</p>
        </div>
        <div className='game-board'>
          {[...Array(9)].map((v, idx) => {
            return (
              <div key='idx' className='square' onClick={() => {updateBoardData(idx)}}>
                {boardData[idx]}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
