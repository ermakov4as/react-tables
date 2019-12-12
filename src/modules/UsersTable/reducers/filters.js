import { SET_FILTERS, RESET_FILTERS } from 'common/constants/actionTypes';

export const initialState = { // TODO: или как-то менее криво можно?
  field: 'username',
  direction: 'desc',
  searchingInput: '',
  filterMail: '',
  fromMoscow: false,
  searchField: 'username'
};

export default (state=initialState, { type, payload }) => {
  switch (type) {
    case SET_FILTERS: {
      return {
        ...state,
        ...payload
      };
    }
    case RESET_FILTERS: {
      return initialState;
    }
    default: {
      return state;
    }
  };
};
