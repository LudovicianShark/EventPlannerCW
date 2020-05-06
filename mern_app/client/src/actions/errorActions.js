import { GET_ERROS, CLEAR_ERRORS, GET_ERRORS } from "./types";

//Return errors
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id },
  };
};

//Clear erros
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
