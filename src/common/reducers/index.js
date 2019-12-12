import { combineReducers } from "redux";
import users from 'modules/UsersTable/reducers/users';
import filters from 'modules/UsersTable/reducers/filters';
import todos from 'modules/UserTodos/reducers/todos';
import fetching from './fetching';
import fetched from './fetched';

export default combineReducers({ users, filters, todos, fetching, fetched });