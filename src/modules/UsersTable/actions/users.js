import { RESET_USERS, FETCH_USERS } from 'common/constants/actionTypes';
import { users as url } from 'common/constants/urls';

export const resetUsers = () => ({ type: RESET_USERS, remove: FETCH_USERS });
export const fetchUsers = payload => ({ type: FETCH_USERS, url, payload });


/* import { ADD_TODO, TOGGLE_TODO, SET_FILTER } from "./actionTypes";

let nextTodoId = 0;

export const addTodo = content => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content
  }
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } }); */
