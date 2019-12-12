import { createStructuredSelector, createSelector } from 'reselect';
import * as actionTypes from 'common/constants/actionTypes';

const fetchTypes = Object.keys(actionTypes);

const fetchingSelector = ({ fetching }) => fetching;
const fetchedSelector = ({ fetched }) => fetched;

const makeSelector = (selector, types) => {
  const fetchersObj = {};
  types.forEach(type => {
    fetchersObj[type] = createSelector(selector, fetchers => fetchers.includes(type));
  })
  return createStructuredSelector(fetchersObj);
};

export const getIsFetching = makeSelector(fetchingSelector, fetchTypes);
export const getIsFetched = makeSelector(fetchedSelector, fetchTypes);