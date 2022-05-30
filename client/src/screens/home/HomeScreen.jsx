import "./home.css"
import Candidates from "../../components/candidates/Candidates"
import LatestJobs from "../../components/jobs/LatestJobs"
import HighPaying from "../../components/jobs/HighPaying"
import profile from "../../assets/profile.jpeg"
import Search from "../../components/search/Search"
import ShowAll from "../../components/posts/ShowAll"
const HomeScreen = ({ user, openDropDown, setOpenDropDown }) => {
  return (
    <div className=" home row m-auto mt-5">
      {/* <SideBar /> */}
      {/* <div className="sidebar  col-md-2 d-sm-none d-none d-md-block  "></div> */}
      <HighPaying profile={profile} />
      <Search />
      <LatestJobs
        openDropDown={openDropDown}
        setOpenDropDown={setOpenDropDown}
      />
      {/* <Candidates /> */}
      <ShowAll
        user={user}
        openDropDown={openDropDown}
        setOpenDropDown={setOpenDropDown}
      />
    </div>
  )
}

export default HomeScreen
