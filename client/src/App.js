import "./index.css"
import { useState, useContext, useEffect } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Profile from "./screens/profile/Profile"
import Login from "./screens/authUI/Login"
import Register from "./screens/authUI/Register"
import TopBar from "./components/topbar/TopBar"
import setAuthToken from "./api_Calls/setAuthToken"
import { authContext } from "./context/auth_context/authContext"
import { loadUserCall } from "./api_Calls/authCalls"
import HomeScreen from "./screens/home/HomeScreen"
import PostJob from "./components/jobs/PostJob"
import SingleJob from "./components/jobs/SingleJob"
import EditedJob from "./components/jobs/EditedJob"
import { companyContext } from "./context/company_context/companyContext"
import { createCompany, loadCompany } from "./api_Calls/companyCall"
import CreateCompany from "./components/company_components/CreateCompany"
import { createProfile, fetchProfile } from "./api_Calls/profileCalls"
import { profileContext } from "./context/profile_context/profileContext"
import Create from "./components/posts/Create"
import JobApplication from "./screens/job_application/JobApplication"
import CompanyProfile from "./screens/company/CompanyProfile"
import { useHistory } from "react-router-dom"
import Edit from "./components/posts/Edit"
// setting auth token
if (localStorage.token) setAuthToken(localStorage.token)
const App = () => {
  const [notConfirmed, setNotConfirmed] = useState(
    localStorage.getItem("registered")
  )
  const [openNav, setOpenNav] = useState(false)
  const [openDropDown, setOpenDropDown] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const { dispatch: CompanyDispatch, company } = useContext(companyContext)
  const { dispatch, user } = useContext(authContext)
  const { dispatch: profileDispatch, profile } = useContext(profileContext)
  useEffect(() => {
    loadUserCall(dispatch)
  }, [dispatch])
  console.log(profile)
  useEffect(() => {
    createProfile(profileDispatch)
    fetchProfile(profileDispatch)
    loadCompany(CompanyDispatch)
    createCompany({}, CompanyDispatch)
  }, [CompanyDispatch, profileDispatch])
  if (user?.confirmed) {
    localStorage.removeItem("registered")
  }

  return (
    <div
      className="App row"
      onClick={() => {
        if (openNav) {
          setOpenNav(!openNav)
        }
        if (openDropDown) {
          setOpenDropDown(!openDropDown)
        }
      }}
    >
      <BrowserRouter>
        <TopBar
          openDropDown={openDropDown}
          setOpenDropDown={setOpenDropDown}
          openNav={openNav}
          setOpenNav={setOpenNav}
          user={user}
        />
        <Switch>
          <Route path="/login">
            <Login notConfirmed={notConfirmed} />
          </Route>
          <Route path="/job/:id">
            <SingleJob />
          </Route>
          <Route path="/post/edit/:id">
            <Edit />
          </Route>
          <Route path="/apply/:id">
            <JobApplication />
          </Route>
          <Route path="/edit/:id">
            <EditedJob />
          </Route>
          <Route path="/post-job">
            <PostJob />
          </Route>
          <Route exact path="/">
            {" "}
            <HomeScreen
              user={user}
              openDropDown={openDropDown}
              setOpenDropDown={setOpenDropDown}
            />
          </Route>
          <Route path="/register">
            <Register
              notConfirmed={notConfirmed}
              setNotConfirmed={setNotConfirmed}
            />
          </Route>
          <Route path="/create">
            <CreateCompany />
          </Route>
          <Route path="/profile/:id">
            {" "}
            <Profile
              showOverlay={showOverlay}
              setShowOverlay={setShowOverlay}
            />
          </Route>
          <Route path="/company/:id">
            <CompanyProfile
              showOverlay={showOverlay}
              setShowOverlay={setShowOverlay}
            />
          </Route>
          <Route path="/post/create">
            <Create />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
