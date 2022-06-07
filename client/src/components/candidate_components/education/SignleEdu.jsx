import React, { useState } from "react";
import { MoreVertRounded, CloseSharp } from "@material-ui/icons";
import { useContext } from "react";
import { deleteEducation } from "../../../api_Calls/profileCalls";
import { profileContext } from "../../../context/profile_context/profileContext";
// import MoreVertRounded className="icon" from '@mui/icons-material/MoreVert';
function SingleEdu({ adding, addEdu }) {
  const { profile, dispatch } = useContext(profileContext)
  const [openOption, setOpenOption] = useState(null)
  const [expPdf, setExpPdf] = useState(false)
  const handleDelete = async (id) => {
    deleteEducation(id)
  }
  function openOptionHandler(eduaction) {
    setOpenOption(eduaction?._id && eduaction._id)
  }
  setTimeout(() => setExpPdf(false), 1000)
  let education = profile?.education

  console.log(education)
  return (
    <>
      <>
        {profile?.education?.length <= 0 && !addEdu ? (
          <>
            <div className="no-experience-message">
              <h3 className="text-danger mt-3 text-center">
                {" "}
                you haven't added any eduaction, yet!
              </h3>
              <small className="text-muted">
                please add some education, if you have.
              </small>
              {adding}
              <small className="text-success text-center mx-3">
                Your Education helps attract employers and get a better job
              </small>
            </div>
          </>
        ) : (
          education &&
          education?.map((edu) => {
            return (
              <div className="experience" key={edu._id}>
                <div
                  className="options position-absolute "
                  onClick={(e) => {
                    openOptionHandler(edu)
                  }}
                >
                  <MoreVertRounded className="icon" />{" "}
                </div>
                {openOption === edu._id && (
                  <div className="options-menu ">
                    <li className="edit ">Edit</li>
                    <li
                      className="del"
                      onClick={() => handleDelete(edu._id, dispatch)}
                    >
                      Delete
                    </li>
                    <li className="send-to-chat">Send to chat</li>
                    <CloseSharp
                      onClick={() => setOpenOption(null)}
                      className="close-option-menu"
                    />
                  </div>
                )}
                <div className="co-name">
                  <span className="preffix">School or college:</span>{" "}
                  {edu.school}
                </div>
                <div className="role">
                  <span className="preffix">Degree:</span> {edu.degree}
                </div>
                <div className="role">
                  <span className="preffix">location:</span> {edu.loc}
                </div>
                <div className="from">
                  <span className="preffix">From:</span> {edu.from}
                </div>
                <div className="to">
                  <span className="preffix">To: </span> {edu.to}
                </div>
                <div>
                  <span> description: </span>
                  {edu.description}
                </div>
                <div className="col-12 experience-statement">
                  <button
                    className=" btn-sm btn btn-info"
                    onClick={() => setExpPdf(true)}
                  >
                    View pdf
                  </button>
                  <button className="btn-sm btn btn-success">
                    {" "}
                    Download pdf
                  </button>
                </div>
                {expPdf && (
                  <h6 className="text-primary no_statement-msg m-2">
                    {" "}
                    coming soon, we are sorry!
                  </h6>
                )}
              </div>
            )
          })
        )}
      </>
    </>
  )
}

export default SingleEdu;
