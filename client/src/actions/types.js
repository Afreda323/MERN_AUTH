export const LOGIN = "login";
export const LOGIN_FAIL = "login_fail";
export const SIGNUP = "signup";
export const LOGOUT = "logout";
export const GET_DATA = "get_data";
export const API_URL = process.env.NODE_ENV === 'production' ? "https://intelligent-croissant-93086.herokuapp.com/api" : 'http://localhost:3000/api';
