import { useState, useContext, useEffect } from "react"
import { Spinner } from "react-bootstrap"
import { useLocation } from "react-router-dom"
import { axiosInstance } from "../../config/axiosInstance"
import { updateJobHandler } from "../../api_Calls/jobCalls"
import { authContext } from "../../context/auth_context/authContext"
import { jobContext } from "../../context/job_context/jobContext"

function EditedJob() {
  const { user } = useContext(authContext)
  const [errors, setErrors] = useState([])
  const [perks, setPerks] = useState([])
  const [addJob, setAddJob] = useState(false)
  const [experienceRequired, setExperienceRequired] = useState("")
  const [recruitmentProcess, setRecruitmentProcess] = useState("")
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [salary, setSalary] = useState(0)
  const [job, setJob] = useState(null)
  const [shift, setShift] = useState("")
  const [industry, setIndustry] = useState("")
  const {
    fetching,
    job: updatedJob,
    jobError,
    dispatch,
  } = useContext(jobContext)
  const { pathname } = useLocation()
  const path = pathname.split("/")[2]
  const url = `/jobs/job/${path}`
  const id = pathname.split("/").pop()
  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await axiosInstance.get(url)
        res.data && setJob(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchJob()
  }, [])
  const updateJob = async (e) => {
    e.preventDefault()
    setPerks("")
    setAddJob("")
    setExperienceRequired("")
    setRecruitmentProcess("")
    setDescription("")
    setTitle("")
    setSalary("")
    setShift("")
    setIndustry("")

    const body = {
      companyName: user.userName,
      perks,
      recruitmentProcess,
      description,
      experienceRequired,
      title,
      salary,
      shift,
      industry,
    }

    updateJobHandler(id, body, dispatch)
    // clear errors
    setErrors(jobError)
    setTimeout(() => {
      setErrors([])
    }, 5000)
  }

  return (
    <div className="col-12 add-new-job row">
      {fetching && !jobError ? (
        <div className="spinner-parent">
          <Spinner
            className="load-profile-spinner m-3"
            variant="primary"
            animation="border"
            role="status"
          ></Spinner>
          {/* create JS animatino */}
          <h4>please Wait...</h4>
        </div>
      ) : (
        <form className="add-job-form col-md-7 col-11" onSubmit={updateJob}>
          <div className="col-12">
            <label>Title</label>
            <input
              defaultValue={job && job.title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
            />
          </div>

          <div className="col-12">
            <label>Experience </label>
            <input
              defaultValue={job && job.experienceRequired}
              onChange={(e) => setExperienceRequired(e.target.value)}
              type="text"
              name="experienceRequired"
              placeholder="what is the Experience needed ?"
            />
          </div>
          <div className="col-12">
            <label>
              entitlements <br />
            </label>
            <input
              defaultValue={job && job.perks}
              onChange={(e) => setPerks(e.target.value)}
              type="text"
              name="perksArray"
              placeholder="e.g Car, Housing, Health Care"
            />{" "}
          </div>
          <div className="col-12 salary-parent">
            <label>Salary per month</label>
            <input
              defaultValue={job && job.salary}
              onChange={(e) => setSalary(e.target.value)}
              type="number"
              name="salary"
            />
          </div>
          <div className="col-12 select-parent">
            <label>Industry</label>
            <select
              name="industry"
              defaultValue={job && job.industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value="">choose Industry</option>{" "}
              <option value="education">Education</option>{" "}
              <option value="Programming">programming</option>
              <option value="business">business</option>
            </select>
          </div>
          <div className="col-12 select-parent">
            <label>Shift</label>
            <select
              defaultValue={job && job.shift}
              name="shift"
              onChange={(e) => setShift(e.target.value)}
            >
              <option value="">choose shift</option>{" "}
              <option value="full-time">full-time</option>{" "}
              <option value="part-time">part-time</option>
            </select>
          </div>

          <div className="col-12 textarea-parent ">
            <label className="col-12 ">Recruitment process</label>
            <textarea
              defaultValue={job && job.recruitmentProcess}
              onChange={(e) => setRecruitmentProcess(e.target.value)}
              type="text"
              name="recruitmentProcess"
            />
          </div>
          <div className="col-12 textarea-parent ">
            <label className="col-12 ">Description</label>
            <textarea
              defaultValue={job && job.description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              name="description"
            />
          </div>
          <div className="errors">
            {errors &&
              errors?.map((arr) => (
                <h5 className="text-center text-danger p-2" key={arr.msg}>
                  {arr.msg}
                </h5>
              ))}
          </div>
          <div className="col-12 action">
            <button
              onClick={() => setAddJob(!addJob)}
              className="btn btn-sm btn-danger"
            >
              concel
            </button>
            <button className="btn btn-sm btn-success">Create Job</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default EditedJob
