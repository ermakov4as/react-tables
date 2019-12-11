export default (store) => next => action => {
  let logData = {
    actionType: action.type,
    action,
    oldStore: store.getState()
  };
  next(action);
  logData.updState = store.getState()
  console.log(logData);
};