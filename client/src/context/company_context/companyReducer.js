import { types } from "./types";
export default function companyReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    // @ case start
    case types.CREATE_COMPANY_START:
    case types.LOAD_COMPANY_START:
    case types.EDIT_PROFILE_START:
      return {
        ...state,
        company: null,
        fetchingCompany: true,
        companyErrors: false,
      };
    // @ case success
    case types.LOAD_COMPANY_SUCCESS:
    case types.CREATE_COMPANY_SUCCESS:
    case types.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        company: payload,
        fetchingCompany: false,
        companyErrors: false,
      };
    case types.CREATE_COMPANY_FAILURE:
    case types.EDIT_PROFILE_FAILURE:
    case types.LOAD_COMPANY_FAILURE:
      return {
        ...state,
        fetchingCompany: false,
        companyErrors: payload,
      };

    default:
      return state;
  }
}
