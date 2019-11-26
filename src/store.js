import { createStore } from "redux";
import rootReducer from "./common/reducers";

const store = createStore(rootReducer);
window.store = store; // TODO: dev only!

export default store;