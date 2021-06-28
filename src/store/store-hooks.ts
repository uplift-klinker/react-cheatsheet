import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from './application-state';

export const useAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ApplicationState> = useSelector;