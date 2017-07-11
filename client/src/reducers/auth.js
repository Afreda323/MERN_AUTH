import { SIGNUP, LOGIN } from "../actions/types";
export default function(state = { isLoggedIn: false }, action) {
  switch (action.type) {
    case LOGIN:
    case SIGNUP:
      return {
        ...state,
        isLoggedIn: true
      };
    default:
      return state;
  }
}
