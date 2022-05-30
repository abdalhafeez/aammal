import { types } from "./types";

export default function authReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case types.LOGIN_START:
    case types.REGISTER_START:
    case types.LOAD_USER_START:
      return {
        token: localStorage.getItem("token"),
        user: null,
        loading: true,
        errors: false,
      }
    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCUESS:
      localStorage.setItem("token", payload.token)
      return {
        token: localStorage.getItem("token"),
        user: null,
        loading: false,
        errors: false,
      }
    case types.LOAD_USER_SUCCESS:
      return {
        token: localStorage.getItem("token"),
        user: payload,
        loading: false,
        errors: false,
      }
    case types.LOGIN_FAILURE:
    case types.REGISTER_FAILURE:
    case types.LOAD_USER_FAILURE:
    case types.LOG_OUT_USER:
      localStorage.removeItem("token")
      return {
        token: null,
        user: null,
        loading: false,
        errors: payload,
      }
    default:
      return state
  }
}
