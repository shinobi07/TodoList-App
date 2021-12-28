import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    colorFromReduxStore: state['general']['sentenceColor'],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeColorEvent: () => dispatch({ type: 'CHANGE_SENTENCE_COLOR' }),
  };
};

function Home(props) {
  return (
    <div
      style={{
        fontSize: '20px',
        color: `#${props.colorFromReduxStore}`,
      }}
      onClick={props.handleChangeColorEvent}
    >
      <b style={{ userSelect: 'none' }}>
        Welcome to my homepage! Click this sentence to change its color.
      </b>
    </div>
  );
}

const home = connect(mapStateToProps, mapDispatchToProps)(Home);

export default home;
