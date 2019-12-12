import { createSelector } from 'reselect';

const usersSelector = ({ users }) => users;

export const getUsers = createSelector(
  usersSelector,
  ({ usersList }) => usersList
);

export const getIsUsersFetchError = createSelector(
  usersSelector,
  ({ error }) => error
);