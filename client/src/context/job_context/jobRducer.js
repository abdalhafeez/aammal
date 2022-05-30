import { types } from "./types";
export default function jobRducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    // @ case start
    case types.CREATE_COMPANY_START:
    case types.GET_SINGLE_JOB_START:
    case types.FETCH_ALL_JOBS_START:
    case types.UPDATE_JOB_START:
    case types.ADD_JOB_START:
      return {
        job: null,
        fetching: true,
        jobError: false,
      };
    // @ case success
    case types.CREATE_COMPANY_SUCCESS:
    case types.GET_SINGLE_JOB_SUCCESS:
    case types.FETCH_ALL_JOBS_SUCCESS:
    case types.ADD_JOB_SUCCESS:
    case types.UPDATE_JOB_SUCCESS:
      return {
        job: payload,
        fetching: false,
        jobError: false,
      };
    case types.CREATE_COMPANY_FAILURE:
    case types.GET_SINGLE_COMPANY_FAILURE:
    case types.FETCH_ALL_JOBS_FAILURE:
    case types.ADD_JOB_FAILURE:
    case types.UPDATE_JOB_FAILURE:
      return {
        job: null,
        fetching: false,
        jobError: payload,
      };
    default:
      return state;
  }
}
