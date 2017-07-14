import axios from "axios";
import { SubmissionError } from "redux-form"; // ES6

import { LOGIN, SIGNUP, LOGIN_FAIL, LOGOUT, GET_DATA, API_URL } from "./types";

export const login = ({ email, password }) => dispatch => {
  return axios
    .post(`${API_URL}/`, {
      email,
      password
    })
    .then(({ data: { token } }) => {
      localStorage.setItem("jwt", token);
      dispatch({
        type: LOGIN,
        payload: token
      });
    })
    .catch(e => {
      throw new SubmissionError({ _error: "Invalid Email or Password" });
    });
};

export const signup = ({ email, password }) => dispatch => {
  return axios
    .post(`${API_URL}/signup`, {
      email,
      password
    })
    .then(({ data: { token } }) => {
      console.log(token);
      localStorage.setItem("jwt", token);
      dispatch({
        type: SIGNUP,
        payload: token
      });
    })
    .catch(e => {
      throw new SubmissionError({ _error: "There was an issue." });
    });
};

export const logout = () => {
  localStorage.removeItem("jwt");
  return {
    type: LOGOUT
  };
};

export const getData = token => dispatch => {
  return axios
    .get(`${API_URL}/secret`, {
      headers: {
        jwt: token
      }
    })
    .then(({ data }) => {
      console.log(data);
      dispatch({ type: GET_DATA, payload: data });
    })
    .catch(e => {
      dispatch(logout());
    });
};
