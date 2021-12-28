import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    colorFromReduxStore: state['general']['backgroundColor'],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeColorEvent: () => dispatch({ type: 'CHANGE_BACKGROUND_COLOR' }),
  };
};

function Color(props) {
  return (
    <div
      style={{
        backgroundColor: `#${props.colorFromReduxStore}`,
      }}
    >
      <button
        style={{ width: '200px', height: '100px' }}
        onClick={props.handleChangeColorEvent}
      >
        Change background color
      </button>
    </div>
  );
}

const color = connect(mapStateToProps, mapDispatchToProps)(Color);

export default color;
