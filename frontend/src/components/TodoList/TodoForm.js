import React, { useState } from 'react';
import Faker from 'faker';
import DateTimePicker from 'react-datetime-picker';

function TodoForm(props) {
  const [todoInput, setTodoInput] = useState(
    props.edit ? props.edit.value : ''
  );
  const [tagInput, setTagInput] = useState(props.edit ? props.edit.tags : '');
  const [timer, setTimer] = useState(props.edit ? props.edit.timer : null);
  const [isCheckedTimer, setIsCheckedTimer] = useState(
    props.edit ? props.edit.isCheckedTimer : false
  );

  const handleChangeTodoInput = (e) => {
    setTodoInput(e.target.value);
  };

  const handleChangeTagInput = (e) => {
    setTagInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: Math.floor(Math.random() * 10000),
      text: todoInput,
      tags:
        tagInput === ''
          ? null
          : tagInput.split(',').map(function (value) {
              return value.trim();
            }),
      last_modified: new Date(),
      timer: isCheckedTimer ? timer : null,
      isCheckedTimer: isCheckedTimer,
    };

    props.onSubmit(newItem);

    setTodoInput('');
    setTagInput('');
    setTimer(null);
  };

  const handleRandom = (e) => {
    const newItem = {
      id: Math.floor(Math.random() * 10000),
      text: Faker.fake('{{random.words}}'),
      tags: [Faker.fake('{{random.words}}'), Faker.fake('{{random.words}}')],
      last_modified: new Date(),
      isCheckedTimer: false,
    };

    props.onSubmit(newItem);

    setTodoInput('');
    setTagInput('');
    setTimer(null);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {props.edit ? (
        <>
          <input
            placeholder="Update your item"
            value={todoInput}
            onChange={handleChangeTodoInput}
            name="text"
            className="todo-input edit"
          />
          &ensp;
          <input
            placeholder="Update your tags"
            value={tagInput}
            onChange={handleChangeTagInput}
            name="text"
            className="todo-input edit"
          />
          &ensp;
          <DateTimePicker
            input={true}
            className="todo-input edit"
            placeholder="Choose a date and time"
            minDate={new Date()}
            clearIcon={null}
            value={timer}
            onChange={(value) => setTimer(new Date(value))}
            format="d/M/yyyy h:mm a"
          ></DateTimePicker>
          &ensp; Include timer
          <input
            type="checkbox"
            checked={isCheckedTimer}
            onChange={(e) => setIsCheckedTimer(!isCheckedTimer)}
          ></input>
          &ensp;
          <button onClick={handleSubmit} className="todo-button edit">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            data-testid="input-box"
            placeholder="Add a todo"
            value={todoInput}
            onChange={handleChangeTodoInput}
            name="text"
            className="todo-input"
          />
          &ensp;
          <input
            data-testid="input-box"
            placeholder="Add tags"
            value={tagInput}
            onChange={handleChangeTagInput}
            name="text"
            className="todo-input"
          />
          &ensp;
          <DateTimePicker
            input={true}
            className="todo-input"
            placeholder="Choose a date and time"
            minDate={new Date()}
            clearIcon={null}
            value={timer}
            onChange={(value) => setTimer(new Date(value))}
            format="d/M/yyyy h:mm a"
          ></DateTimePicker>
          &ensp; Include timer
          <input
            type="checkbox"
            checked={isCheckedTimer}
            onChange={(e) => setIsCheckedTimer(!isCheckedTimer)}
          ></input>
          &ensp;
          <button onClick={handleSubmit} className="todo-button">
            Add
          </button>
          &ensp;
          <button onClick={handleRandom} className="todo-button">
            Random
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
