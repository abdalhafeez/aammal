import React from "react";
import "./profilesOptions.css";
function ProfilesOptions({ user, setEmployee, setCompany }) {
  return (
    <div className="profiles-options">
      <div className="new-user-msg">
        <h2>Welcome {user?.userName}</h2>
        <h4>what would you like to do?</h4>
        <div className="user-choices">
          <button
            className="btn btn-lg btn-primary"
            onClick={() => {
              setEmployee(true);
              localStorage.removeItem("newUser", false);
              localStorage.setItem("company", true);
            }}
          >
            create an employee profile
          </button>
          <button
            className="btn btn-lg btn-info"
            onClick={() => {
              setCompany(true);

              localStorage.setItem("profile", true);
              localStorage.removeItem("newUser", false);
            }}
          >
            create a company profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilesOptions;
