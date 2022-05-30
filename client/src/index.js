import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import AuthContextProvider from "./context/auth_context/authContext";
import ProfileContextProvider from "./context/profile_context/profileContext";
import CompanyContextProvider from "./context/company_context/companyContext";
import JobContextProvider from "./context/job_context/jobContext";
ReactDOM.render(
  <React.StrictMode>
    <JobContextProvider>
      <AuthContextProvider>
        <ProfileContextProvider>
          <CompanyContextProvider>
            <App />
          </CompanyContextProvider>
        </ProfileContextProvider>
      </AuthContextProvider>
    </JobContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
