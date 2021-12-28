import { combineReducers, createStore } from 'redux';

function general(
  state = { backgroundColor: 779556, sentenceColor: '000000' },
  action
) {
  let newState = { ...state };
  let rand = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
  if (action.type === 'CHANGE_BACKGROUND_COLOR') {
    newState['backgroundColor'] = rand;
  } else if (action.type === 'CHANGE_SENTENCE_COLOR') {
    newState['sentenceColor'] = rand;
  }
  return newState;
}

// You can list several reducers to be combined...
const rootReducer = combineReducers({ general });

const store = createStore(rootReducer);
export default store;
