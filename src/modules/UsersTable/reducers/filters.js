import { SET_FILTERS, RESET_FILTERS } from 'common/constants/actionTypes';
import { userParamsNames } from 'common/services/mock';

const initialState = {
  field: 'username',
  direction: 'desc',
  searchingInput: '',
  filterMail: '',
  fromMoscow: false,
  searchCategory: userParamsNames[1]
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
