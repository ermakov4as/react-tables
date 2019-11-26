import { SET_FILTERS, RESET_FILTERS } from '../../../common/constants/actionTypes';
import { userParamsNames } from '../../../common/services/mock';

const initialState = {
  field: 'username',
  direction: 'desc',
  searchingInput: '',
  filterMail: '',
  fromMoscow: false,
  searchCategory: userParamsNames.find(_userData => _userData.name === 'username')
};

export default (state=initialState, { type, payload }) => {
  switch (type) {
    case SET_FILTERS: {
      return {
        ...state,
        ...payload
      }
    }
    case RESET_FILTERS: {
      return initialState
    }
    default: {
      return state;
    }
  }
};
