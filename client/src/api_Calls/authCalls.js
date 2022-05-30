import { axiosInstance } from "../config/axiosInstance"
import { types } from "../context/auth_context/types"
import { createProfile } from "./profileCalls"
import setAuthToken from "./setAuthToken"
// Register new user

// Log in user
export const loginCall = async (credentials, dispatch) => {
  const config = {
    headers: {
      "Context-Type": "application/json",
    },
  }
  dispatch({ type: types.LOGIN_START })
  try {
    const res = await axiosInstance.post("/auth", credentials, config)
    res.data && window.location.replace("/")
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data })
  } catch (error) {
    dispatch({
      type: types.LOGIN_FAILURE,
      payload: error?.response?.data.errors,
    })
  }
}
// loading user
export const loadUserCall = async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const res = await axiosInstance.get("/auth")
    dispatch({ type: types.LOAD_USER_SUCCESS, payload: res.data })
  } catch (error) {
    console.log(error?.response)
    dispatch({
      type: types.LOAD_USER_FAILURE,
      payload: error?.response?.data?.errors,
      payload: error,
    })
  }
}
export const logOut = (dispatch) => {
  dispatch({ type: types.LOG_OUT_USER, payload: "you are loging out..." })
}
