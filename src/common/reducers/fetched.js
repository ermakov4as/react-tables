import { ADD_FETCHED, REMOVE_FETCHED } from 'common/constants/actionTypes';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_FETCHED: {
      if (state.indexOf(payload) === -1) {
        return [...state, payload];
      } else {
        return state;
      };
      
    }
    case REMOVE_FETCHED: {
      return state.filter(item => item !== payload)
    }
    default: {
      return state;
    }
  };
};