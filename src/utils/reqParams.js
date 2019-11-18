
const reqParams = (reqParams) => {
  const _reqParams = reqParams.filter(({ notIncludeToReq }) =>  !notIncludeToReq )
  let _params = _reqParams ? '?' : ''
  _reqParams.forEach(({ name, value }) => {
    _params += (`${name}=${value}&`)  
  })
  return _params.slice(0, -1)
} 

export default reqParams