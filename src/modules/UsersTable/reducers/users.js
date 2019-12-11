import { SET_USERS, RESET_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAIL } from 'common/constants/actionTypes';

const initialState = {
  usersList: [],
  error: null,
  fetched: false
};

export default (state = initialState, { type, payload, data, error }) => {
  switch (type) {
    case SET_USERS: {
      return [...payload];
    }
    case RESET_USERS: {
      return initialState;
    }
    case FETCH_USERS_SUCCESS: {
      return {
        ...state,
        usersList: data,
        fetched: true
      };
    }
    case FETCH_USERS_FAIL: {
      return {
        ...state,
        error
      };
    }
    default: {
      return state;
    }
  };
};