import { SET_FETCHERS, RESET_FETCHERS } from 'common/constants/actionTypes';

export const setFetchers = payload => ({ type: SET_FETCHERS, payload });
export const resetFetchers = payload => ({ type: RESET_FETCHERS, payload });