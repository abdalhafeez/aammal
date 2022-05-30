import "./sidebar.css";
import { useContext } from "react";

import { Link } from "react-router-dom";
import { logOut } from "../../api_Calls/authCalls";
import { authContext } from "../../context/auth_context/authContext";
const SideBarItems = () => {
  const { dispatch } = useContext(authContext);
  return (
    <div className="sidebar-items">
      <div className="logout mb-5" onClick={() => logOut(dispatch)}>
        Logout
      </div>{" "}
      <span>Or</span>
      <Link to="login" className="m5-5">
        sign up
      </Link>
      <Link to="register">Log in</Link>
      <Link to="settings">settings</Link>
      <Link to="me">profile</Link>
    </div>
  );
};

export default SideBarItems;
