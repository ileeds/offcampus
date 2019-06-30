import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import homesReducer from "../reducers/homesReducer";
import authReducer from "../reducers/authReducer";
import landingReducer from "../reducers/landingReducer";

const store = createStore(
  combineReducers({
    form: formReducer,
    homes: homesReducer,
    auth: authReducer,
    landing: landingReducer
  }),
  applyMiddleware(thunk)
);

export default store;
