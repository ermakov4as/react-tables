import { ADD_FETCHING, REMOVE_FETCHING } from 'common/constants/actionTypes';

export const setFetchers = payload => ({ type: ADD_FETCHING, payload });
export const resetFetchers = payload => ({ type: REMOVE_FETCHING, payload });