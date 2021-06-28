import {ApplicationState} from '../../store/application-state';
import {createSelector} from '@reduxjs/toolkit';
import {useAppSelector} from '../../store/store-hooks';

const selectSettingsState = (state: ApplicationState) => state.settings;

export const selectSettings = createSelector(
    selectSettingsState,
    s => s
)

export const selectSettingsApiUrl = createSelector(
    selectSettings,
    s => s.api.url
)

export const useSettings = () => useAppSelector(selectSettings);