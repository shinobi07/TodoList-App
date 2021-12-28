import React from 'react';
import Board from './Board';
import { connect } from 'react-redux';

function Chess(props) {
  const bgColor = props.colorFromReduxStore;

  return (
    <div
      className="chess"
      style={{
        display: 'grid',
        placeContent: 'center',
        height: '94vh',
        backgroundColor: `#${bgColor}`,
      }}
    >
      <Board />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    colorFromReduxStore: state['general']['backgroundColor'],
  };
};
const chess = connect(mapStateToProps, null)(Chess);

export default chess;
