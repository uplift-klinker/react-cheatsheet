import axios from 'axios';
import {SettingsModel} from './settings.model';

async function load(): Promise<SettingsModel> {
    const response = await axios.get<SettingsModel>('/assets/settings.json');
    return response.data;
}

export const SettingsLoader = {
    load
}