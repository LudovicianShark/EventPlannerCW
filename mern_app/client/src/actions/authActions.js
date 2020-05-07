import axios from "axios";
import { returnErrors } from "./errorActions";

//Importing types
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "./types";

// Check token and load use
export const loadUser = () => (dispatch, getState) => {
  //User Loading
  dispatch({ type: USER_LOADING });

  //load user with autherisastion action
  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    //Error catcher
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

//Register user with inputted name, email and password
export const register = ({ name, email, password }) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });

  //Post to users database
  axios
    .post("/api/users", body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    //Error catcher
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

export const tokenConfig = (getState) => {
  //Get token from local storage
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
