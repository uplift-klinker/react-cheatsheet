import {FunctionComponent} from 'react';
import {useSettings} from '../../settings/state/settings-selectors';

export const Shell: FunctionComponent = () => {
    const settings = useSettings();
    return (
        <main>
            {JSON.stringify(settings)}
        </main>
    );
};