
const reqParams = (params) => {
  const localReqParams = params.filter(({ notIncludeToReq }) =>  !notIncludeToReq );
  let localParams = localReqParams ? '?' : '';
  localReqParams.forEach(({ name, value }) => {
    localParams += (`${name}=${value}&`);
  });
  return localParams.slice(0, -1);
};

export default reqParams;