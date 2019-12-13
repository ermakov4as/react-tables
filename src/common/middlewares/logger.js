export default (store) => next => action => {
  const logData = {
    actionType: action.type,
    action,
    oldStore: store.getState()
  };
  next(action);
  logData.updState = store.getState();
  // eslint-disable-next-line
  console.log(logData);
};