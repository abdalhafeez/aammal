import { axiosInstance } from "../config/axiosInstance"
import { types } from "../context/job_context/types"
// fetch single job by id
export const getSingleJob = async (pathname, dispatch) => {
  dispatch({ type: types.GET_SINGLE_JOB_START })
  try {
    const res = await axiosInstance.get(`/jobs${pathname}`)
    dispatch({
      type: types.GET_SINGLE_JOB_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: types.GET_SINGLE_JOB_FAILURE,
      payload: error.response.data.errors,
    })
  }
}
// fetching all job/////////////////////////////////
export const fetchAllJobs = async (dispatch) => {
  dispatch({ type: types.FETCH_ALL_JOBS_START })
  try {
    const res = await axiosInstance.get("/jobs")
    dispatch({ type: types.FETCH_ALL_JOBS_SUCCESS, payload: res.data })
  } catch (error) {
    console.log(error)
  }
}
// add job
export const AddJobHandler = async (body, dispatch) => {
  dispatch({ type: types.ADD_JOB_START })
  const config = {
    headers: {
      "Context-Type": "application/josn",
    },
  }
  try {
    const res = await axiosInstance.post("/jobs", body, config)
    res.data && window.location.replace("/")
    dispatch({ type: types.ADD_JOB_SUCCESS, payload: res.data })
  } catch (error) {
    console.log(error.response.data.errors)
    dispatch({
      type: types.ADD_JOB_FAILURE,
      payload: error.response.data.errors,
    })

    error.response.data.errors && window.scrollTo(0, 3000)
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 5000)
  }
}

// update job
export const updateJobHandler = async (id, body, dispatch) => {
  dispatch({ type: types.UPDATE_JOB_START })
  const config = {
    headers: {
      "Context-Type": "application/josn",
    },
  }
  try {
    const res = await axiosInstance.put(`/jobs/${id}`, body, config)
    console.log(res.data)
    dispatch({ type: types.UPDATE_JOB_SUCCESS, payload: res.data })
    res.data && window.location.replace("/")
  } catch (error) {
    dispatch({
      type: types.UPDATE_JOB_FAILURE,
      payload: error.response.data.errors,
    })

    error.response.data.errors && window.scrollTo(0, 300)
  }
}
