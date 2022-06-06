import "./sidebar.css";
import { useContext } from "react";

import { Link } from "react-router-dom";
import { logOut } from "../../api_Calls/authCalls";
import { authContext } from "../../context/auth_context/authContext";
const SideBarItems = () => {
  const { dispatch, user } = useContext(authContext)
  return (
    <div className="sidebar-items">
      {user ? (
        <div className="logout mb-5" onClick={() => logOut(dispatch)}>
          Logout
        </div>
      ) : (
        <>
          <Link to="login" className="m5-5">
            sign up
          </Link>
          <Link to="register">Log in</Link>
        </>
      )}
      <Link to="me" className="profile">
        profile
      </Link>
      <Link to="settings">settings</Link>
    </div>
  )
};

export default SideBarItems;
