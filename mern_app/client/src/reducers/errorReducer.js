import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

//Initial state before error reducer actions
const iniialState = {
  msg: {},
  status: null,
  id: null,
};

//function changes state depending on backend response
export default function (state = iniialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };

    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null,
      };
    default:
      return state;
  }
}
