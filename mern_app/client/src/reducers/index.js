import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

//All reducers combined in one export
export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
});
