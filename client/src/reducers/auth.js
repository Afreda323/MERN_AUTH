import { SIGNUP, LOGIN, LOGIN_FAIL, LOGOUT } from "../actions/types";

export default function(
  state = { token: localStorage.getItem("jwt") || null },
  action
) {
  switch (action.type) {
    case LOGIN:
    case SIGNUP:
      return {
        ...state,
        token: action.payload
      };
    case LOGIN_FAIL:
      return state;
    case LOGOUT:
      return {
        ...state,
        token: null
      };
    default:
      return state;
  }
}
