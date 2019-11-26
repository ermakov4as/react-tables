import { SET_USERS } from '../../../common/constants/actionTypes';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USERS: {
      return [...payload];
    }
    default: {
      return state;
    }
  }
};

