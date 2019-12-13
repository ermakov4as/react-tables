import { RESET_USERS, FETCH_USERS } from 'common/constants/actionTypes';
import { users as url } from 'common/constants/urls';

export const resetUsers = () => ({ type: RESET_USERS, remove: FETCH_USERS });
export const fetchUsers = payload => ({ type: FETCH_USERS, url, payload });