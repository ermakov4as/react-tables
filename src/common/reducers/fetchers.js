import { SET_FETCHERS, RESET_FETCHERS } from 'common/constants/actionTypes';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_FETCHERS: {
      /* console.log([...state, payload]) */
      if (state.indexOf(payload) === -1) {
        return [...state, payload];
      } else {
        return state;
      };
      /* return [...state, payload]; */
      
    }
    case RESET_FETCHERS: {
      /* console.log([...state].filter(item => item !== payload)) */
      /* const updState = state.splice(state.indexOf(payload), 1); */
      return [...state].filter(item => item !== payload)
    }
    default: {
      return state;
    }
  };
};