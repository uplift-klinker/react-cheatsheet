import {createAction, PrepareAction} from '@reduxjs/toolkit';
import {AnyAction} from 'redux';

const REQUEST_POSTFIX = ' Request';
const SUCCESS_POSTFIX = ' Success';
const FAILED_POSTFIX = ' Failed';

export const isRequestAction = (action: AnyAction): boolean => action.type.endsWith(REQUEST_POSTFIX);
export const isSuccessAction = (action: AnyAction): boolean => action.type.includes(SUCCESS_POSTFIX);
export const isFailedAction = (action: AnyAction): boolean => action.type.includes(FAILED_POSTFIX);

export const getAsyncActionSetBaseType = (action: AnyAction): string => action.type
    .replace(REQUEST_POSTFIX, '')
    .replace(SUCCESS_POSTFIX, '')
    .replace(FAILED_POSTFIX, '');

export const nullPayloadActionCreator = () => ({payload: null});

export function createAsyncActionSet<TRequestPayloadCreator extends PrepareAction<any>,
    TSuccessPayloadCreator extends PrepareAction<any>,
    TFailedPayloadCreator extends PrepareAction<any>,
    TType extends string = string>(
    baseActionType: string,
    prepareRequest: TRequestPayloadCreator,
    prepareSuccess: TSuccessPayloadCreator,
    prepareFailed: TFailedPayloadCreator
) {
    return {
        baseType: baseActionType,
        request: createAction(`${baseActionType}${REQUEST_POSTFIX}`, prepareRequest),
        success: createAction(`${baseActionType}${SUCCESS_POSTFIX}`, prepareSuccess),
        failed: createAction(`${baseActionType}${FAILED_POSTFIX}`, prepareFailed)
    };
}
