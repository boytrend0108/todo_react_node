import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import { Todo } from './types/todo';
import { client } from './api/httpClient';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [todo, setTodo] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const normalizedTodo = todo.trim();

    if (!normalizedTodo) {
      setError('Todo is empty');

      setTimeout(() => {
        setError('');
      }, 1000);

      return;
    }
    setLoading(true);

    client
      .addTodo(todo)
      .then((newTodo) => setTodos([...todos, newTodo]))
      .catch(() => setError("Sorry, i can't add a new todo"))
      .finally(() => {
        setLoading(false);
        setTodo('');
      });
  }

  useEffect(() => {
    setLoading(true);

    client
      .getTodos()
      .then(setTodos)
      .catch(() => setError("Error: can't get todos"))
      .finally(() => setLoading(false));
  }, [loading]);

  return (
    <section className="section">
      <h1 className="title">Todo with REST API</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Label</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Text input"
              name="todo"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>
          <p className="help">This is a help text</p>
        </div>

        <div className="control">
          <button className="button is-primary">Add todo</button>
        </div>
      </form>

      <section className="section">
        {loading && <h4 className="title is-4">Loading...</h4>}
        {error && !loading && (
          <div className="notification is-danger">{error}</div>
        )}

        {!loading && !error && (
          <>
            {todos.map((todoItem) => (
              <article className="message" key={todoItem.id}>
                <div className="message-header">
                  <p>{todoItem.title}</p>
                  <button className="delete" aria-label="delete"></button>
                </div>
                <div className="message-body">{todoItem.todo}</div>
              </article>
            ))}
          </>
        )}
      </section>
    </section>
  );
}

export default App;
