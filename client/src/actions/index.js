import { LOGIN, SIGNUP, LOGIN_FAIL, LOGOUT } from "./types";
import axios from "axios";
import { SubmissionError } from "redux-form"; // ES6
const API_URL = "http://localhost:3000/api";

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

export function signup({ email, password }) {
  return {
    type: SIGNUP,
    payload: "token"
  };
}

export function logout() {
  localStorage.removeItem("jwt");
  return {
    type: LOGOUT
  };
}
