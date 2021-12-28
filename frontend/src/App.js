import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import Home from './components/Home/Home';
import Info from './components/Info/Info';
import TodoList from './components/TodoList/TodoList';
import NoMatch from './components/NoMatch';
import Chess from './components/Chess/Chess';
import About from './components/Color/Color';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

function App(props) {
  const bgColor = props.colorFromReduxStore;
  return (
    <div
      style={{
        backgroundColor: `#${bgColor}`,
        height: '100vh',
      }}
    >
      <BrowserRouter>
        <div>
          <nav className="navbar">
            <ul className="ul-navbar">
              <li className="li-navbar">
                <Link to="/">Home</Link>
              </li>
              <li className="li-navbar">
                <Link to="/info">Info</Link>
              </li>
              <li className="li-navbar">
                <Link to="/color">Color</Link>
              </li>
              <li className="li-navbar">
                <Link to="/chess">Chess</Link>
              </li>
              <li className="li-navbar">
                <Link to="/todolist">To-do List</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/info">
              <Info />
            </Route>
            <Route path="/color">
              <About />
            </Route>
            <Route path="/chess">
              <Chess />
            </Route>
            <Route path="/todolist">
              <TodoList />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    colorFromReduxStore: state['general']['backgroundColor'],
  };
};
const app = connect(mapStateToProps, null)(App);

export default app;
