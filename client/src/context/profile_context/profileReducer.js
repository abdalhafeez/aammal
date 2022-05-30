import { types } from "./types";

export default function profileReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    // @ case start
    case types.CREATE_PROFILE_START:
    case types.ADDING_PROFILE_START:
    case types.LOAD_PROFILE_START:
    case types.UPDATE_PROFILE_START:
    case types.ADD_EXPERIENCE_START:
    case types.UPLOAD_PHOTO_START:
      return {
        ...state,
        profile: null,
        isFetching: true,
        profileErrors: false,
      };
    // @ case success
    case types.CREATE_PROFILE_SUCCESS:
    case types.UPDATE_PROFILE_SUCCESS:
    case types.ADDING_PROFILE_SUCCESS:
    case types.ADD_EXPERIENCE_SUCCESS:
    case types.ADD_EDUCATION_SUCCESS:
    case types.DELETE_EDUCATION_SUCCESS:
    case types.DELETE_EXPERIENCE_SUCCESS:
    case types.UPLOAD_PHOTO_SUCCESS:
    case types.LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
        isFetching: false,
        profileErrors: false,
      };

    // @ case failure
    // [note: this fails when some fields are not provides (the form is in Experience.jsx)]
    // when this fires(types.ADD_EXPERIENCE_FAILURE), it return the initial
    // state, althought, there's a profile[linee-24], before firing the function that adds experience
    case types.ADD_EXPERIENCE_FAILURE:
      return {
        ...state, //here I am copying the state, that
        // should have the profile, but it returns an empty state
        profile: payload.profile,
        isFetching: false,
        profileErrors: payload.errors,
      };

    default:
      return state;
  }
}
