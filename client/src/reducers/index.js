import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import data from "./data";

export default combineReducers({
  auth,
  data,
  form: formReducer
});
