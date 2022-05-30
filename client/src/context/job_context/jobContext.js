import { createContext, useReducer } from "react";
import jobRducer from "./jobRducer";
const initialState = {
  job: null,
  fetching: false,
  jobError: null,
};
export const jobContext = createContext(initialState);
const JobContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobRducer, initialState);
  return (
    <jobContext.Provider
      value={{
        job: state.job,
        fetching: state.fetching,
        jobError: state.jobError,
        dispatch,
      }}
    >
      {children}
    </jobContext.Provider>
  );
};
export default JobContextProvider;
