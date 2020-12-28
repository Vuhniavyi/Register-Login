import { userConstants } from "../../constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { loggedIn: true, user, loginAttemps: 0, blockTime: null }
  : { loginAttemps: 0, blockTime: null };

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,

        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return { ...state };
    case userConstants.LOGOUT:
      return { ...initialState };
    case userConstants.UPDATE_ATTEMPT:
      return {
        ...state,
        loginAttemps: state.loginAttemps + 1,
      };
    case userConstants.BLOCK_TIME:
      return {
        ...state,
        blockTime: Date.now(),
      };
    case userConstants.RESET_BLOCK_TIME:
      return {
        ...state,
        blockTime: null,
        loginAttemps: 0,
      };
    default:
      return state;
  }
}
