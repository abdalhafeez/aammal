import { createContext, useReducer } from "react";
import profileReducer from "./profileReducer";
let initialState = {
  profile: null,
  isFetching: false,
  profileErrors: null,
};
// auth context
export const profileContext = createContext(initialState);
// auth context provider component
const ProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  return (
    <profileContext.Provider
      value={{
        profile: state.profile,
        isFetching: state.isFetching,
        profileErrors: state.profileErrors,
        dispatch,
      }}
    >
      {children}
    </profileContext.Provider>
  );
};
export default ProfileContextProvider;
