import _ from 'lodash';

import { createSelector } from 'reselect';
import { initialState } from 'modules/UsersTable/reducers/filters';

const filtersSelector = ({ filters }) => filters;

export const getFilters = createSelector(
  filtersSelector,
  filters => filters
);

export const getAreFiltersChanged = createSelector(
  filtersSelector,
  filters => _.isEqual(filters, initialState)
)