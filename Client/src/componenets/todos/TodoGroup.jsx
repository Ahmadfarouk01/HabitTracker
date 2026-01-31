import React from 'react';
import TodoItem from './TodoItem';

const TodoGroup = ({ day, todos }) => {
  return (
    <div className="mb-6">
      <h4 className="font-medium mb-2">{day}</h4>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoGroup;
