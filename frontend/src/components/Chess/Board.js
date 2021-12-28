import React from 'react';
import './Board.css';
import Square from './Square';

export default function Board() {
  let board = [];
  for (let i = 1; i < 9; i++) {
    for (let j = 8; j >= 1; j--) {
      board.push(
        <Square
          key={(i + j * Math.floor(Math.random() * 10000)).toString()}
          total={i + j}
        />
      );
    }
  }
  return (
    <div>
      <h3 className="eight">Irrelevant info for 800px</h3>
      <h3 className="five">Irrelevant info for 500px</h3>
      <div className="chessboard">{board}</div>
    </div>
  );
}
