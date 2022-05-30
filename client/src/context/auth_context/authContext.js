import { createContext, useReducer } from "react";
import authReducer from "./authReducer";
const initialState = {
  token: localStorage.getItem("token"),
  loading: false,
  errors: null,
  user: null,
}
// auth context
export const authContext = createContext(initialState);
// auth context provider component
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <authContext.Provider
      value={{
        token: state.token,
        loading: state.loading,
        errors: state.errors,
        user: state.user,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export default AuthContextProvider;
