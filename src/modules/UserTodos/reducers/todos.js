import { FETCH_TODOS_SUCCESS, FETCH_TODOS_FAIL } from 'common/constants/actionTypes';

const initialState = {
  todosList: [],
  error: null
};

export default (state = initialState, { type, data, error }) => {
  switch (type) {
    case FETCH_TODOS_SUCCESS: {
      return {
        ...state,
        todosList: data
      };
    }
    case FETCH_TODOS_FAIL: {
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