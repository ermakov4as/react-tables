import { createSelector } from 'reselect';

const usersSelector = ({ users }) => users;

export const getUsers = createSelector(
    usersSelector,
    users => users
);

export default {};