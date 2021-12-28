import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Timer from './Timer';

function Todo({
  todos,
  completeTodo,
  removeTodo,
  updateTodo,
  moveTodoUp,
  moveTodoDown,
}) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
    tags: null,
    timer: null,
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
      tags: null,
      timer: null,
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
      style={{ userSelect: 'none' }}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        <div style={{ fontSize: 22 }}>Task: {todo.text}</div>
        {todo.tags ? (
          <div style={{ fontSize: 15 }}>Tags: {todo.tags.join(', ')}</div>
        ) : null}
        <div style={{ fontSize: 14 }}>
          Last modified: {new Date(todo.last_modified).toString()}
        </div>
        <div style={{ fontSize: 14 }}>
          Deadline: {todo.timer ? new Date(todo.timer).toString() : 'None'}
        </div>
        <div style={{ fontSize: 14 }}>
          Timer:{' '}
          <Timer
            taskName={todo.text}
            isComplete={todo.isComplete}
            deadline={todo.timer}
          ></Timer>
        </div>
      </div>
      <div className="icons">
        <i
          id="icons"
          className="fa fa-caret-up"
          onClick={() => moveTodoUp(todo)}
        ></i>
        <span>&nbsp;&nbsp;</span>
        <i
          id="icons"
          className="fa fa-caret-down"
          onClick={() => moveTodoDown(todo)}
        ></i>
        <span>&nbsp;&nbsp;</span>
        <i
          id="icons"
          className="fa fa-pencil"
          onClick={() =>
            setEdit({
              id: todo.id,
              value: todo.text,
              tags: todo.tags ? todo.tags.join(', ') : '',
              last_modified: new Date(),
              timer: todo.timer,
              isCheckedTimer: todo.isCheckedTimer,
            })
          }
        ></i>
        <span>&nbsp;&nbsp;</span>
        <i
          id="icons"
          className="fa fa-ban"
          onClick={() => removeTodo(todo.id)}
        ></i>
      </div>
    </div>
  ));
}

export default Todo;
