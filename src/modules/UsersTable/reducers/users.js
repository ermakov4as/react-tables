import { SET_USERS, RESET_USERS } from 'common/constants/actionTypes';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USERS: {
      return [...payload];
    }
    case RESET_USERS: {
      return initialState;
    }
    default: {
      return state;
    }
  };
};

