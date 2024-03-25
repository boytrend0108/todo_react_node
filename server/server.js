/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import * as todosControllers from './controllers/todo.controller.js';

const PORT = process.env.PORT || 3000;

const server = express();

server.use(cors({ origin: 'http://localhost:5173' })); // add cors middleware

server.get('/todos', todosControllers.get);

server.get('/todos/:id', todosControllers.getOne);

server.post('/todos', express.json(), todosControllers.create);

server.delete('/todos/:id', todosControllers.remove);

server.put('/todos/:id', express.json(), todosControllers.update);

server.listen(PORT, () => {
  console.log(`Server run on http:localhost:${PORT}`);
});
