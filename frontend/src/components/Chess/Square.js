import React from 'react';
import './Square.css';

export default function Square(props) {
  const total = props.total;
  const [tileColor, setTileColor] = React.useState(
    total % 2 === 0 ? 'black-tile tile' : 'white-tile tile'
  );
  const handleChangeTileColor = (e) => {
    setTileColor(
      tileColor === 'white-tile tile' ? 'black-tile tile' : 'white-tile tile'
    );
  };
  return <div className={tileColor} onClick={handleChangeTileColor}></div>;
}
