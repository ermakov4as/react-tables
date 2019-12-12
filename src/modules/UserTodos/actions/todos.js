import { FETCH_TODOS } from 'common/constants/actionTypes';
import { todos } from 'common/constants/urls';

export const fetchTodos = payload => ({ type: FETCH_TODOS, url: todos(payload) });

export default {};