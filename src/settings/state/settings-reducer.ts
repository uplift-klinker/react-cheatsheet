import {SettingsModel} from '../settings.model';
import {createReducer} from '@reduxjs/toolkit';

export function createSettingsReducer(settings: SettingsModel) {
    return createReducer(settings, builder => builder);
}