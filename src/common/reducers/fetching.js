import { ADD_FETCHING, REMOVE_FETCHING } from 'common/constants/actionTypes';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_FETCHING: {
      if (state.indexOf(payload) === -1) {
        return [...state, payload];
      };
      return state;
    }
    case REMOVE_FETCHING: {
      return state.filter(item => item !== payload)
    }
    default: {
      return state;
    }
  };
};