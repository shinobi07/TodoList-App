import React from 'react';
import { connect } from 'react-redux';

function Info(props) {
  const bgColor = props.colorFromReduxStore;

  return (
    <div
      style={{
        backgroundColor: `#${bgColor}`,
      }}
    >
      <h1>Info page</h1>
      <h2>Name of author: Tuan Nguyen</h2>
      <p>
        Hello! My name is Tuan Nguyen. This is my work for the assignment of the
        Full Stack Web Development - Frontend part.
      </p>
      <p>There are 5 views in this website:</p>
      <ul className="ul-info">
        <li>Home</li>
        <li>Info</li>
        <li>Color</li>
        <li>Chess</li>
        <li>To-do List</li>
      </ul>
      <h2>To-do List page</h2>
      Here, you will have a to-do list with all the things you plan to do. There
      is an <button className="todo-button">Add</button> button to add new
      things to the list, and a <button className="todo-button">Random</button>{' '}
      button to give out random item.
      <br />
      There will be 4 input places:
      <ol>
        <li>Task name input</li>
        <li>Task tags input</li>
        <li>Text input to search for specific items</li>
        <li>Tag input to filter items</li>
      </ol>{' '}
      and 1 checkbox for task deadline. Users can decide whether to include the
      due date by checking the "Include timer
      <input type="checkbox"></input>" or not. Make sure you read the
      placeholder of each one before entering.
      <br />
      <br />
      When you want to search for items, the function starts filtering letter by
      letter so sometimes you can find the item before finishing entering its
      whole name.
      <br />
      <br />
      Each to-do item has a task name and tags right underneath the task name,
      so that when you want to look for items within a certain tag, you can type
      the tag to the tag input below the to-do item input. The filtering is
      case-insensitive and can work on multi tags at a time separated by commas.
      <br />
      <br />
      All the to-do items a 'delete' icon{' '}
      <i id="icons" className="fa fa-ban"></i> to delete the item, and an 'edit'
      icon <i id="icons" className="fa fa-pencil"></i> to edit the textual
      description of the item.
      <br />
      If you want to reorder the list, you can click either{' '}
      <i id="icons" className="fa fa-caret-up"></i> to move the item up or{' '}
      <i id="icons" className="fa fa-caret-down"></i> to move it down. When a
      task is done, you can click its text to cross it out without having to
      delete it from the list.
      <br />
      <br />
      In order to sort the list based on modification time, you can click either{' '}
      <button className="todo-button">Sort by latest</button> to sort by latest
      or
      <button className="todo-button">Sort by oldest</button> to sort by oldest.
      All actions afterwards will have effect on the original list, so when you
      make changes to the list, you will see the list that is rendered for the
      first time instead of the new sorted one.
      <br />
      <br />
      The tasks can now have deadlines. You can only set deadlines from today
      till later. In addition, the remaining time until deadline will be counted
      and shown underneath the deadline. When the timer hits 0, the timer shows
      "Time's up" and an alert goes off. The date and time for deadline can be
      edited or removed, and the timer restarts. If the task is already
      complete, editing the deadline will not start the countdown.
      <h2>Home page</h2>
      <p>
        In this site, there is a welcome sentence. Every time you click it, its
        color changes.
      </p>
      <h2>Color page</h2>
      <p>
        In this site, there is a button to change background color for the whole
        website. The color stays the same even if you go to other views.
      </p>
      <h2>Info page</h2>
      <p>
        It's the one you are in right now, showing the necessary information of
        the whole website.
      </p>
      <h2>Chess page</h2>
      <p>
        In this site, there is a chess board that you can change the color of
        each tile to either black or white.
        <br />
        <br />
        When you resize the width to 800px, the first h3 tag disappears, and the
        white tiles become antiquewhite. When you resize the width to 500px, the
        second h3 tag disappears, the other h3 tag comes back, and the black
        tiles become chocolate. The board also gets smaller for each level.
      </p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    colorFromReduxStore: state['general']['backgroundColor'],
  };
};
const info = connect(mapStateToProps, null)(Info);

export default info;
