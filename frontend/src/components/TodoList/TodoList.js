import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import TodoForm from './TodoForm';
import Todo from './Todo';
import './TodoList.css';
import axios from 'axios';

function TodoList(props) {
  const bgColor = props.colorFromReduxStore;
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = React.useState('');
  const [text, setText] = React.useState('');
  const [sortedData, setSortedData] = useState([]);
  const [toBeFetched, setToBeFetched] = useState(true);

  useEffect(() => {
    axios.get('https://taskreminder-api.herokuapp.com/items').then((res) => {
      setTodos(
        res.data.map((item) => {
          return {
            ...item,
            last_modified: new Date(item.last_modified),
            timer: item.timer ? new Date(item.timer) : null,
          };
        })
      );
    });
  }, [toBeFetched]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    axios
      .post('https://taskreminder-api.herokuapp.com/items', todo)
      .then(() => setToBeFetched(!toBeFetched));
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    axios
      .put(`https://taskreminder-api.herokuapp.com/items/${todoId}`, newValue)
      .then(() => setToBeFetched(!toBeFetched));
  };

  const removeTodo = (id) => {
    axios
      .delete(`https://taskreminder-api.fly.dev/items/${id}`)
      .then(() => setToBeFetched(!toBeFetched));
  };

  const completeTodo = (id) => {
    todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
        updateTodo(id, todo);
      }
      return todo;
    });
  };

  const moveTodoDown = (todo) => {
    let data = [...todos];
    let index = data.findIndex((item) => item === todo);
    if (index === data.length - 1) {
      return;
    }

    updateTodo(data[index + 1].id, data[index]);
    updateTodo(data[index].id, data[index + 1]);
  };

  const moveTodoUp = (todo) => {
    let data = [...todos];
    let index = data.findIndex((item) => item === todo);
    if (index === 0) {
      return;
    }

    updateTodo(data[index - 1].id, data[index]);
    updateTodo(data[index].id, data[index - 1]);
  };

  const searchedItems = useMemo(() => {
    if (!text || text === 'all') return todos;

    return todos.filter((item) =>
      item.text.toLowerCase().startsWith(text.toLowerCase())
    );
  }, [text, todos]);

  const filteredData = useMemo(() => {
    let newCategory = category
      .toLowerCase()
      .split(',')
      .map((value) => {
        return value.trim();
      });

    if ((newCategory[0] === '') | (newCategory[0] === 'all')) return todos;

    return todos.filter((item) =>
      item.tags.some((element) => newCategory.includes(element.toLowerCase()))
    );
  }, [category, todos]);

  useEffect(() => {
    if (searchedItems[0] === '') return filteredData;
    if (filteredData[0] === '') return searchedItems;
    setSortedData(
      filteredData.filter((item) => searchedItems.indexOf(item) !== -1)
    );
    return;
  }, [filteredData, searchedItems]);

  const sortByOldest = (e) => {
    setSortedData([
      ...sortedData.sort((a, b) => a.last_modified - b.last_modified),
    ]);
  };

  const sortByLatest = (e) => {
    setSortedData([
      ...sortedData.sort((a, b) => b.last_modified - a.last_modified),
    ]);
  };

  return (
    <div
      style={{
        backgroundColor: `#${bgColor}`,
      }}
    >
      <h2>&nbsp;What's the Plan for Today?</h2>
      <div>
        <h1 style={{ fontSize: 22 }}>&nbsp;Adding a to-do item</h1>
        <TodoForm onSubmit={addTodo} />
      </div>
      <div>
        <h1 style={{ fontSize: 22 }}>&nbsp;Searching for to-do items</h1>
        &nbsp;Search an item by task name&nbsp;
        <input
          data-testid="input-box"
          placeholder="Enter text to search for an item"
          value={text}
          onChange={(e) => setText(e.target.value)}
          name="text"
          className="todo-input"
        />
        &ensp; Filter items by tags&nbsp;
        <input
          data-testid="input-box"
          placeholder="Enter tags to filter items"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          name="text"
          className="todo-input"
        />
        &ensp;
        <button onClick={sortByLatest} className="todo-button">
          Sort by latest
        </button>
        &ensp;
        <button onClick={sortByOldest} className="todo-button">
          Sort by oldest
        </button>
      </div>
      <br />
      <Todo
        todos={sortedData}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        moveTodoUp={moveTodoUp}
        moveTodoDown={moveTodoDown}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    colorFromReduxStore: state['general']['backgroundColor'],
  };
};
const todoList = connect(mapStateToProps, null)(TodoList);

export default todoList;
