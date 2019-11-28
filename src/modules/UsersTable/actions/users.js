import { SET_USERS, RESET_USERS } from '../../../common/constants/actionTypes';

export const setUsers = payload => ({ type: SET_USERS, payload });
export const resetUsers = () => ({ type: RESET_USERS });


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
