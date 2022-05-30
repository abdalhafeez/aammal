//ui
import "./styles/postJob.css"
//init
import { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
//others
//context
import { jobContext } from "../../context/job_context/jobContext"
import { AddJobHandler } from "../../api_Calls/jobCalls"
import SpinnerComponent from "../common/SpinnerComponent"
//components
function PostJob() {
  const [errors, setErrors] = useState([])
  const [perks, setPerks] = useState([])
  const [addJob, setAddJob] = useState(false)
  const [experienceRequired, setExperienceRequired] = useState("")
  const [recruitmentProcess, setRecruitmentProcess] = useState("")
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [salary, setSalary] = useState(0)
  const [shift, setShift] = useState("")
  const [educationRequired, setEducationRequired] = useState("")
  const [workingDays, setWorkingDays] = useState("")
  const [place, setPlace] = useState("")
  const [industry, setIndustry] = useState("")
  const history = useHistory()
  const { fetching, jobError, dispatch } = useContext(jobContext)
  const clearFields = () => {
    setPerks("")
    setAddJob("")
    setExperienceRequired("")
    setRecruitmentProcess("")
    setDescription("")
    setTitle("")
    setSalary("")
    setPlace("")
    setWorkingDays("")
    setIndustry("")
    setEducationRequired("")
    setShift("")
  }
  const body = {
    recruitmentProcess,
    experienceRequired,
    educationRequired,
    description,
    workingDays,
    industry,
    salary,
    place,
    shift,
    title,
  }
  console.log(body)
  const addJobHandler = (e) => {
    e.preventDefault()
    AddJobHandler(body, dispatch)
    clearFields()

    // clear errors
    setErrors(jobError)
    setTimeout(() => {
      setErrors([])
    }, 6000)
  }

  return (
    <div className="col-12 add-new-job row">
      {fetching && !errors ? (
        <SpinnerComponent ward={"Creating Job"} />
      ) : (
        <form
          className="add-job-form col-md-10 col-12 my-3"
          onSubmit={addJobHandler}
        >
          <h1 className="text-success text-center">Create Job</h1>
          <div className="col-12 ">
            <label>Title</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
            />
          </div>
          <div className="col-12">
            <label>Experience </label>
            <input
              onChange={(e) => setExperienceRequired(e.target.value)}
              type="text"
              name="experienceRequired"
            />
          </div>
          <div className="col-12 row">
            <label className="col-sm-12 ">
              Perks:{" "}
              <small className="text-muted">
                separate with a <span className="text-danger">(,)</span>
              </small>
            </label>{" "}
            <input
              onChange={(e) => setPerks(e.target.value)}
              type="text col-sm-10"
              name="perksArray"
              className="col-sm-10 "
              placeholder="e.g Car, Housing, Health Cars"
            />{" "}
          </div>

          <div className="col-12 salary-parent">
            <label>Salary per month:</label>
            <input
              onChange={(e) => setSalary(e.target.value)}
              type="number"
              name="salary"
            />
          </div>
          <div className="col-12 row selects">
            <div className="col-md-3 col-12 select-parent">
              <label>Industry:</label>
              <select
                name="industry"
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option value="">choose</option>{" "}
                <option value="education">Education</option>{" "}
                <option value="Programming">programming</option>
                <option value="business">business</option>
              </select>
            </div>
            <div className="col-md-3 col-12 select-parent">
              <label>Shift:</label>
              <select name="shift" onChange={(e) => setShift(e.target.value)}>
                <option value="">choose</option>{" "}
                <option value="full-time">full-time</option>{" "}
                <option value="part-time">part-time</option>
              </select>
            </div>
            <div className="col-md-3 col-12  select-parent">
              <label>Place:</label>
              <select name="place" onChange={(e) => setPlace(e.target.value)}>
                <option value="">choose</option>{" "}
                <option value="From Office">From Office</option>{" "}
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>
          <div className="col-12 textarea-parent col-md-7 ">
            <label className="col-12 ">
              Working Days:{" "}
              <small className="text-muted">
                separate with a <span className="text-danger">(,)</span>
              </small>
            </label>

            <textarea
              onChange={(e) => setWorkingDays(e.target.value)}
              type="text"
              name="workingDays"
              placeholder="e.g Sunday, Monday, Tuseday etc"
            />
          </div>

          <div className="col-12 textarea-parent col-md-7">
            <label className="col-12 ">Education:</label>
            <textarea
              onChange={(e) => setEducationRequired(e.target.value)}
              type="text"
              name="educationRequired"
            />
          </div>

          <div className="col-12 textarea-parent col-md-7 ">
            <label className="col-12 ">Recruitment process:</label>
            <textarea
              onChange={(e) => setRecruitmentProcess(e.target.value)}
              type="text"
              name="recruitmentProcess"
            />
          </div>
          <div className="col-12 textarea-parent col-md-7 ">
            <label className="col-12 ">Description:</label>
            <textarea
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

            <button className="btn btn-sm btn-success">Submit</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default PostJob
