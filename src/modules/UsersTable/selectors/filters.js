import { createSelector } from 'reselect';

const filtersSelector = ({ filters }) => filters;

export const getFilters = createSelector(
    filtersSelector,
    filters => filters
);

const filtersIsFromMoscowSelector =  ({ filters: { fromMoscow } }) => fromMoscow;

export const getFiltersIsFromMoscow = createSelector(
    filtersIsFromMoscowSelector,
    fromMoscow => fromMoscow
);