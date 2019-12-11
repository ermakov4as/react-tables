import { createSelector } from 'reselect';

const usersSelector = ({ users: { usersList } }) => usersList;
export const getUsers = createSelector(
  usersSelector,
  usersList => usersList
);

const getIsUsersFetchErrorSelector = ({ users: { error } }) => error;
export const getIsUsersFetchError = createSelector(
  getIsUsersFetchErrorSelector,
  error => error
);

const getAreUsersLoadedSelector = ({ users: { fetched } }) => fetched;
export const getAreUsersLoaded = createSelector(
  getAreUsersLoadedSelector,
  fetched => fetched
);

/* const getAreUsersLoadingSelector = ({ loaders }) => loaders;
export const getAreUsersLoading = createSelector(
  getAreUsersLoadingSelector,
  (loaders) => {
    const res = !!(loaders.findIndex(item => item === FETCH_USERS) + 1);
    return res;
  }
); */
