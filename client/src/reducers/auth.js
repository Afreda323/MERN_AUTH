import { SIGNUP, LOGIN } from "../actions/types";
export default function(state = { loggedIn: false }, action) {
  switch (action.type) {
    case LOGIN:
    case SIGNUP:
      return {
        ...state,
        loggedIn: true
      };
    default:
      return state;
  }
}
