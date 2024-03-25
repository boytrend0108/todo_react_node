import { v4 as uuidv4 } from 'uuid';

let todos = [
  {
    id: '1',
    title: 'JS',
    todo: 'learn and forget',
    completed: false,
  },
];

export function getAll() {
  return todos;
}

export function getById(id) {
  return todos.find((todo) => todo.id === id) || null;
}

export function create(todo) {
  const newTodo = {
    id: uuidv4(),
    title: todo.split(' ').slice(0, 1).join(' ').toUpperCase(),
    todo,
    completed: false,
  };

  todos.unshift(newTodo);

  return newTodo;
}

export function update({ id, todo, completed }) {
  const existTodo = todos.find((el) => el.id === id);

  if (!existTodo) {
    return false;
  }

  return Object.assign(existTodo, { todo, completed });
}

export function remove(id) {
  todos = todos.filter((el) => el.id !== id);
}
