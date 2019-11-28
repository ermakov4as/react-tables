import { combineReducers } from "redux";
import users from 'modules/UsersTable/reducers/users';
import filters from 'modules/UsersTable/reducers/filters';

export default combineReducers({ users, filters });