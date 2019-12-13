import axios from 'axios';
import { BASE_URL } from 'common/constants/urls';
import { ADD_FETCHING, REMOVE_FETCHING, ADD_FETCHED, REMOVE_FETCHED } from 'common/constants/actionTypes';
import reqParams from 'common/utils/reqParams';


const { CancelToken } = axios;
let cancel;

export default () => next => action => {
  const { type, payload, url, remove } = action;
  if (!url) {
    if (remove) {
      next({ type: REMOVE_FETCHED, payload: remove });
    }
    return next(action);
  };

  if (cancel) cancel();

  next({ ...action, type: `${type}_START` });
  next({ type: ADD_FETCHING, payload: type });
  const fetchParams = payload ? reqParams(payload) : '';

  return axios.get(`${BASE_URL}${url}${fetchParams}`, {
    cancelToken: new CancelToken(c => {
      // An executor function receives a cancel function as a parameter
      cancel = c;
    })
  })
    .then(({ data }) => {
      next({ type: `${type}_SUCCESS`, data });
      next({ type: REMOVE_FETCHING, payload: type });
      next({ type: ADD_FETCHED, payload: type });
    })
    .catch(error => {
      if (axios.isCancel(error)) {
        // eslint-disable-next-line
        console.log('post Request canceled');
      } else {
        next({ type: `${type}_FAIL`, error });
      };
      next({ type: REMOVE_FETCHING, payload: type });
    });
};  