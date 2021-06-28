import {SettingsModel} from '../src/settings/settings.model';
import * as faker from 'faker';

function createSettingsModel(model: Partial<SettingsModel> = {}): SettingsModel {
    return {
        api: {
            url: faker.internet.url(),
            ...model.api
        },
        ...model
    };
}

export const ModelFactory = {
    createSettingsModel,
};