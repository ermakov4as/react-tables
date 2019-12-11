import { createSelector } from 'reselect';

const filtersSelector = ({ filters }) => filters;
export const getFilters = createSelector(
    filtersSelector,
    filters => filters
);

export default {};