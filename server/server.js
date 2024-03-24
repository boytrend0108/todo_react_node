/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const PORT = process.env.PORT || 3000;

const server = express();

const todos = [
  {
    id: '1',
    title: 'JS',
    todo: 'learn and forget',
    completed: true,
  },
];

server.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://boytrend0108.github.io/todo_react_node/',
    ],
  }),
); // add cors middleware

server.get('/todos', (req, res) => {
  console.log(req.url);
  res.send(todos);
});

server.get('/todos/:id', (req, res) => {
  const { id } = req.params;

  const todo = todos.find((el) => el.id === id);

  if (!todo) {
    res.sendStatus(404);

    return;
  }

  res.send(todo);
});

server.post('/todos', express.json(), (req, res) => {
  const newTodo = req.body;

  newTodo.id = uuidv4();
  newTodo.title = newTodo.todo.split(' ').slice(0, 1).join(' ');
  todos.unshift(newTodo);

  if (!newTodo.todo) {
    res.sendStatus(422);
  }

  res.statusCode = 201;
  res.send(newTodo);
});

server.listen(PORT, () => {
  console.log(`Server run on http:localhost:${PORT}`);
});
