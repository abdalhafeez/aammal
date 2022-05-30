import { Link } from "react-router-dom"

function JobTitle({ job, showNote, setShowNote }) {
  return (
    <div className="job-title-container col-10 m-auto row">
      {showNote === job._id && (
        <span className="pointer-parent">
          <span className="pointer"></span>
          <span className="show-profile">Click to view company</span>
        </span>
      )}
      <Link
        onMouseEnter={() => setShowNote(job._id)}
        onMouseLeave={() => setShowNote(null)}
        to={`/company/${job.company}`}
        className=" link col-12 name"
      >
        {job.companyName}
      </Link>{" "}
      {/* <small className="text-primary">{job.shift}: </small> */}
    </div>
  )
}

export default JobTitle
