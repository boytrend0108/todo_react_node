import * as todosServises from '../servises/todo.servise.js';

export function get(req, res) {
  res.send(todosServises.getAll());
}

export function getOne(req, res) {
  const { id } = req.params;
  const todo = todosServises.getById(id);

  if (!todo) {
    res.sendStatus(404);

    return;
  }

  res.send(todo);
}

export function create(req, res) {
  const { todo } = req.body;
  const newTodo = todosServises.create(todo);

  if (!newTodo.todo) {
    res.sendStatus(422);
  }

  res.statusCode = 201;
  res.send(newTodo);
}

export function remove(req, res) {
  const { id } = req.params;

  if (!todosServises.getById(id)) {
    res.statusCode(404);
    res.send('This todo not found');
  }

  todosServises.remove(id);
  res.sendStatus(204);
}

export function update(req, res) {
  const { id } = req.params;
  const { todo, completed } = req.body;
  const updatedTodo = todosServises.update({ id, todo, completed });

  if (!updatedTodo) {
    res.sendStatus(404);

    return;
  }

  res.send(updatedTodo);
}
