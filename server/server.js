/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import * as todosServises from './servises/todo.servise.js';

const PORT = process.env.PORT || 3000;

const server = express();

server.use(cors({ origin: 'http://localhost:5173' })); // add cors middleware

server.get('/todos', (req, res) => {
  res.send(todosServises.getAll());
});

server.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = todosServises.getById(id);

  if (!todo) {
    res.sendStatus(404);

    return;
  }

  res.send(todo);
});

server.post('/todos', express.json(), (req, res) => {
  const { todo } = req.body;
  const newTodo = todosServises.create(todo);

  if (!newTodo.todo) {
    res.sendStatus(422);
  }

  res.statusCode = 201;
  res.send(newTodo);
});

server.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  if (!todosServises.getById(id)) {
    res.statusCode(404);
    res.send('This todo not found');
  }

  todosServises.remove(id);
  res.sendStatus(204);
});

server.put('/todos/:id', express.json(), (req, res) => {
  const { id } = req.params;
  const { todo, completed } = req.body;
  const updatedTodo = todosServises.update({ id, todo, completed });

  if (!updatedTodo) {
    res.sendStatus(404);

    return;
  }

  res.send(updatedTodo);
});

server.listen(PORT, () => {
  console.log(`Server run on http:localhost:${PORT}`);
});
