import { axiosInstance } from "../config/axiosInstance"

import { types } from "../context/company_context/types"
// create profile
export const createCompany = async (body, dispatch) => {
  const config = {
    headers: {
      "Context-Type": "application/json",
    },
  }
  dispatch({ type: types.CREATE_COMPANY_START })
  try {
    const res = await axiosInstance.post(
      "/companiesProfiles",
      body,
      config
    )
    res.data &&
      dispatch({ type: types.CREATE_COMPANY_SUCCESS, payload: res.data })
  } catch (error) {
    dispatch({
      type: types.CREATE_COMPANY_FAILURE,
      payload: error?.response?.data,
    })
  }
}
//  load company
export const loadCompany = async (dispatch) => {
  dispatch({ type: types.LOAD_COMPANY_START })
  try {
    const res = await axiosInstance.get("/companiesProfiles/me")
    res.data &&
      dispatch({ type: types.LOAD_COMPANY_SUCCESS, payload: res.data })
  } catch (error) {
    dispatch({
      type: types.LOAD_COMPANY_FAILURE,
      payload: error?.response?.data,
    })
  }
}
// add values
export const AddToProfile = async (body, dispatch) => {
  dispatch({ type: types.EDIT_PROFILE_START })
  const config = {
    headers: {
      "Context-Type": "application/json",
    },
  }
  try {
    const res = await axiosInstance.post(
      "/companiesProfiles",
      body,
      config
    )
    console.log(res.data)
    res.data &&
      dispatch({ type: types.EDIT_PROFILE_SUCCESS, payload: res.data })
  } catch (error) {
    dispatch({
      type: types.EDIT_PROFILE_FAILURE,
      payload: error?.response?.data,
    })
  }
}

// /////////////
// export const fetchCompanyById = async (res) => {

// }
