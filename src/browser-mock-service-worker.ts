import {rest, setupWorker} from 'msw';
import {v4 as uuid} from 'uuid';
import {TodoModel} from './todos/state/todo.model';
import {SettingsModel} from './settings/settings.model';

let todos: Array<TodoModel> = [];

function addTodo(todo: TodoModel): TodoModel {
    const newTodo = {...todo, id: uuid()};
    todos.push(newTodo);
    return newTodo;
}

function updateTodo(todo: TodoModel): TodoModel | null {
    const existing = todos.find(i => i.id === todo.id);
    if (!existing) {
        return null;
    }

    const updated = {...existing, ...todo};
    todos = todos.map(t => t.id === todo.id ? updated : t);
    return updated;
}

function removeTodo(todoId: string): boolean {
    const existing = todos.find(t => t.id === todoId);
    if (!existing) {
        return false;
    }

    todos = todos.filter(t => t.id === todoId);
    return true;
}

async function setup(settings: SettingsModel) {
    if (process.env.NODE_ENV === 'production') {
        return;
    }
    const worker = setupWorker(
        rest.get(`${settings.api.url}/todos`, (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json(todos)
            );
        }),
        rest.post(`${settings.api.url}/todos`, (req, res, ctx) => {
            return res(
                ctx.status(201),
                ctx.json(addTodo(req.body as TodoModel))
            );
        }),
        rest.put(`${settings.api.url}/todos/:id`, (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json(updateTodo(req.body as TodoModel))
            )
        }),
        rest.delete(`${settings.api.url}/todos/:id`, (req, res, ctx) => {
            const status = removeTodo(req.params['id']) ? 204 : 404;
            return res(
                ctx.status(status)
            )
        })
    );
    await worker.start();
}

export const BrowserMockServiceWorker = {
    setup
}