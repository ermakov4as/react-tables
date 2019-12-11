const reqParams = ({ searchField, search, field, direction, fromMoscow, filterMail }) => {
  const urlParams = combineParams([ {
    name: 'searchField',
    value: searchField,
    notIncludeToReq: !search
  }, {
    name: 'search',
    value: search,
    notIncludeToReq: !search
  }, {
    name: 'field',
    value: field
  }, {
    name: 'direction',
    value: direction
  }, {
    name: 'fromMoscow',
    value: fromMoscow,
    notIncludeToReq: !fromMoscow
  }, {
    name: 'filterMail',
    value: filterMail,
    notIncludeToReq: !filterMail
  }]);
  return urlParams;
};

export default reqParams;

const combineParams = (params) => {
  const localReqParams = params.filter(({ notIncludeToReq }) =>  !notIncludeToReq );
  let localParams = localReqParams ? '?' : '';
  localReqParams.forEach(({ name, value }) => {
    localParams += (`${name}=${value}&`);
  });
  return localParams.slice(0, -1);
}