import {SettingsModel} from '../src/settings/settings.model';
import * as faker from 'faker';
import {TodoModel} from '../src/todos/state/todo.model';

function createSettingsModel(model: Partial<SettingsModel> = {}): SettingsModel {
    return {
        api: {
            url: faker.internet.url(),
            ...model.api
        },
        ...model
    };
}

function createTodoModel(model: Partial<TodoModel> = {}): TodoModel {
    return {
        id: faker.datatype.uuid(),
        title: faker.hacker.verb(),
        isDone: model.isDone !== undefined ? model.isDone : false,
        ...model,
    }
}

function createMany<T>(creator: () => T, count: number): Array<T> {
    const items: Array<T> = [];
    for (let i = 0; i < count; i++) {
        items.push(creator());
    }
    return items;
}

export const ModelFactory = {
    createSettingsModel,
    createTodoModel,
    createMany
};