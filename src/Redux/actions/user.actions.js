import { userConstants } from "../../constants";
import { userService } from "../../services";
import { alertActions } from ".";
import { history } from "../../helpers";

export const userActions = {
  login,
  logout,
  register,
  getAll,
};

function login(username, password, from) {
  return (dispatch, getState) => {
    const { loginAttemps, blockTime } = getState().authentication;
    const timeout = blockTime ? Date.now() - blockTime : blockTime;
    if (timeout > 60000) {
      dispatch(resetBlockTime());
    } else if (!timeout && loginAttemps >= 3) {
      dispatch(startBlockTime());
      dispatch(alertActions.error("Try again in 1 minute"));
    }
    if (getState().authentication.loginAttemps < 3) {
      dispatch(request({ username }));

      userService.login(username, password).then(
        (user) => {
          dispatch(resetBlockTime());
          dispatch(success(user));
          history.push(from);
        },
        (error) => {
          dispatch(updateAttemt());
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
    }
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function updateAttemt() {
  return { type: userConstants.UPDATE_ATTEMPT };
}

function startBlockTime() {
  return { type: userConstants.BLOCK_TIME };
}

function resetBlockTime() {
  return { type: userConstants.RESET_BLOCK_TIME };
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success());
        history.push("/login");
        dispatch(alertActions.success("Registration successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function getAll() {
  return (dispatch) => {
    dispatch(request());

    userService.getAll().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}


