import { SET_FILTERS, RESET_FILTERS } from '../../../common/constants/actionTypes';

export const setFilters = payload => ({ type: SET_FILTERS, payload });
export const resetFilters = () => ({ type: RESET_FILTERS });