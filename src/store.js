import { createStore, applyMiddleware } from 'redux';
import logger from 'common/middlewares/logger';
import fetcher from 'common/middlewares/fetcher';
import rootReducer from './common/reducers';

const middlewares = [fetcher, logger];
const store = createStore(rootReducer, applyMiddleware(...middlewares));



window.store = store; // TODO: dev only!

export default store;