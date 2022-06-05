import "./userOptions.css"
import Join from "../join/Join"
import "./topbar.css"
import Menu from "../menu/Menu"
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons"
//init
import { Link, useLocation } from "react-router-dom"
import { useContext } from "react"
//context
import { profileContext } from "../../context/profile_context/profileContext"
import { companyContext } from "../../context/company_context/companyContext"
import { authContext } from "../../context/auth_context/authContext"
import { logOut } from "../../api_Calls/authCalls"
import { axiosInstance, PF } from "../../config/axiosInstance"
import UserIcon from "./UserIcon"
function Topbar({ user, openNav, setOpenNav, openDropDown, setOpenDropDown }) {
  const { dispatch } = useContext(authContext)
  const { profile } = useContext(profileContext)
  const { company } = useContext(companyContext)
  const candidate = user?.profileType === "employee"
  const { pathname } = useLocation()
  const deleteAccountHanlder = async () => {
    try {
      const res = await axiosInstance.delete(`/users/${user._id}`)
      console.log(res)
      window.alert(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className="row m-0 topbar col-12">
      <div className="col col-3  d-flex top-right">
        <Link to="/" className=" link">
          <h3 className="logo mx-1 link">Career House</h3>
        </Link>
      </div>
      <div className="col-2 col-md-4">
        <h1></h1>
      </div>
      <div className="middle-links col-5 col-md-3">
        <>
          {user && (
            <>
              {openDropDown ? (
                <li
                  className="drop-icon-parent"
                  onClick={() => setOpenDropDown(false)}
                >
                  Me
                  <ArrowDropDown className="drop-icon" />
                </li>
              ) : (
                <li
                  className="drop-icon-parent"
                  onClick={() => setOpenDropDown(user?.userName)}
                >
                  Me
                  <ArrowDropUp className="drop-icon" />
                </li>
              )}
              {openDropDown === user?.userName && (
                <>
                  {" "}
                  <ui className="user-drop-menu">
                    <UserIcon
                      user={user}
                      profile={profile}
                      company={company}
                      candidate={candidate}
                      PF={PF}
                    />
                    <li
                      className="logout-delete-parent"
                      onClick={() => logOut(dispatch)}
                    >
                      <Link to="/" className="link logout">
                        Logout
                      </Link>
                      <Link
                        to="/"
                        className="link delete"
                        onClick={deleteAccountHanlder}
                      >
                        Delete Account
                      </Link>
                    </li>
                  </ui>
                </>
              )}
            </>
          )}
        </>

        {!pathname.includes("company") && <Join openNav={openNav} />}
      </div>
      <Menu openNav={openNav} />
      <div className="col-2 d-md-none d-lg-block d-lg-none d-xl-block d-xl-none d-xxl-block ">
        <div className=" nav-btn  position-relative d-flex justify-content-end">
          <div
            onClick={() => setOpenNav(!openNav)}
            className={
              openNav ? "move-nav-icon position-relative opener" : "opener"
            }
          >
            <span
              className={!openNav ? "line-one" : "line-one-open col-md-12"}
            ></span>
            <span
              className={!openNav ? "line-two" : "line-two-open col-md-12"}
            ></span>
            <span
              className={!openNav ? "line-three" : "line-three-open col-md-12"}
            ></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
