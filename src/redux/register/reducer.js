import * as types from "./type";
let initialState = {
  loading: false,
  errormsg: "",
  error: false,
  message: "",
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.USER_LOADING: {
      return {
        loading: true,
      };
    }
    case types.USER_SUCCESS: {
      return {
        loading: false,
        message: payload,
      };
    }
    case types.USER_ERROR: {
      return {
        loading: false,
        error: true,
        errormsg: payload,
      };
    }
    case types.ADMIN_LOADING: {
      return {
        loading: true,
      };
    }
    case types.ADMIN_SUCCESS: {
      return {
        loading: false,
        message: payload,
      };
    }
    case types.ADMIN_ERROR: {
      return {
        loading: false,
        error: true,
        errormsg: payload,
      };
    }
    default:
      return state;
  }
};