import { BASE_URL } from 'common/constants/urls';
import { SET_FETCHERS, RESET_FETCHERS } from 'common/constants/actionTypes';
import reqParams from 'common/utils/reqParams';

export default () => next => action => {
  const { type, payload, url } = action;
  if (!url) {
    return next(action);
  };

  next({ ...action, type: `${type}_START` });
  next({ type: SET_FETCHERS, payload: type });
  const fetchParams = reqParams(payload);

  return fetch(`${BASE_URL}${url}${fetchParams}`)
    .then(response => response.json())
    .then(data => {
      next({ type: `${type}_SUCCESS`, data });
      next({ type: RESET_FETCHERS, payload: type });
    })
    .catch(error => {
      next({ type: `${type}_FAIL`, error });
      next({ type: RESET_FETCHERS, payload: type });
    });
};  