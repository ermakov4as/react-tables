import { RESET_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAIL } from 'common/constants/actionTypes';

const initialState = {
  usersList: [],
  error: null
};

export default (state = initialState, { type, data, error }) => {
  switch (type) {
    case RESET_USERS: {
      return initialState;
    }
    case FETCH_USERS_SUCCESS: {
      return {
        ...state,
        usersList: data,
        error: null
      };
    }
    case FETCH_USERS_FAIL: {
      return {
        ...state,
        usersList: [],
        error
      };
    }
    default: {
      return state;
    }
  };
};