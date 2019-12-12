import { createSelector } from 'reselect';

const todosSelector = ({ todos }) => todos;

export const getTodos = createSelector(
  todosSelector,
  ({ todosList }) => todosList
);

export const getIsTodosFetchError = createSelector(
  todosSelector,
  ({ error }) => error
);