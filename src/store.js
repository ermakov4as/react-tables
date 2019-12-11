import { createStore, applyMiddleware } from 'redux';
import rootReducer from './common/reducers';
import logger from 'common/middlewares/logger';
import fetcher from 'common/middlewares/fetcher';

const middlewares = [fetcher, logger];
const store = createStore(rootReducer, applyMiddleware(...middlewares));



window.store = store; // TODO: dev only!

export default store;