import Close from "@material-ui/icons/Close"

import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { authContext } from "../../context/auth_context/authContext"
import "./search.css"
import { formatDistance, subDays } from "date-fns"
import { axiosInstance } from "../../config/axiosInstance"
function Search() {
  const [searchWord, setSearchWord] = useState("")
  const [jobs, setJobs] = useState([])
  const { user } = useContext(authContext)
  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await axiosInstance.get("/jobs")
        setJobs(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPost()
  }, [])

  const searchJobs = jobs?.filter((job) =>
    job.title.toLowerCase().includes(searchWord?.toLowerCase())
  )
  const handleSetSearchWord = (e) => {
    setSearchWord(e.target.innerText)
  }
  // let titles = []
  // for (let i = 0; i <= 4; i++) {
  //   titles.puth(jobs.title)
  // }
  // setSearchTitles()
  const handleDeleteSeachWord = (id) => {}
  // console.log(titles)
  return (
    <div className="search-area mt-3  col-md-4 col-12">
      {user && (
        <>
          {user?.profileType === "company" ? (
            <Link to="post-job" className="link">
              <button className=" add-new-job-btn">post a new job</button>
            </Link>
          ) : (
            ""
          )}
        </>
      )}
      <form className="input-form">
        <label>Search For jobs</label>
        <input
          value={searchWord}
          type="search"
          className="search-input"
          placeholder="search For Jobs"
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </form>
      <div className=" mt-2">
        {!searchWord ? (
          <div className="latest-searches">
            {jobs?.slice(1, 12).map((job) => (
              <span onClick={handleSetSearchWord} key={job._id}>
                {job.title.split(" ")[0] + " " + job.title.split(" ")[1]}{" "}
                <Close
                  // onClick={deleteSearch}
                  className="hide-icon"
                  onClick={handleDeleteSeachWord}
                />
              </span>
            ))}
          </div>
        ) : (
          <div className="searchedJobs-parent mt-2">
            {searchWord.length > 4 &&
              searchJobs?.map((job) => (
                <Link className="link" to={`job/${job?._id}`} key={job?._id}>
                  <ul className="searchedJobs-list">
                    <li className="job-date">
                      {formatDistance(
                        subDays(new Date(job.createdAt), 0),
                        Date.now(),
                        { addSuffix: false }
                      )}
                    </li>{" "}
                    <li className="searchedJob-title list-item" key={job?._id}>
                      {job?.title}
                    </li>
                  </ul>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
