import "./profile.css";
import React, { useContext } from "react";
import { authContext } from "../../context/auth_context/authContext"
import CadidateProfile from "../candidate/CadidateProfile"
function Profile({ showOverlay, setShowOverlay }) {
  const { user } = useContext(authContext)
  return (
    <div className=" profile-parent">
      <CadidateProfile
        showOverlay={showOverlay}
        setShowOverlay={setShowOverlay}
      />
    </div>
  )
}

export default Profile;
