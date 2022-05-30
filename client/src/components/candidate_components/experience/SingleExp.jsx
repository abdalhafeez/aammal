import "./singleExp.css";
import React, { useState } from "react";
import { MoreVertRounded, CloseSharp } from "@material-ui/icons";
import { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom"
import { profileContext } from "../../../context/profile_context/profileContext"
import { deleteExperience } from "../../../api_Calls/profileCalls"
function SingleExp({ adding, addExp }) {
  const { profile, dispatch, isFetching } = useContext(profileContext)
  const [openOption, setOpenOption] = useState(null)
  const [expPdf, setExpPdf] = useState(false)
  const { pathname } = useLocation()
  const userId = pathname.split("/").pop()
  const authorized = userId === profile?._id
  // delete experience
  const handleDelete = (id) => {
    deleteExperience(id, dispatch)
  }
  console.log(profile)
  setTimeout(() => setExpPdf(false), 7000)

  return (
    <>
      {profile?.experience?.length <= 0 && !addExp ? (
        <div className="no-experience-message">
          <h3 className="text-danger mt-3 text-center">
            {" "}
            you don't have experience
          </h3>
          <p className="text-muted m-3 ">
            the experiences you add will appear here
          </p>
          {adding}
          <small className="text-center text-success mx-3">
            {" "}
            employers always prefer someone with experience, for way they can
            trust you to do the job
          </small>
        </div>
      ) : (
        profile?.experience &&
        profile.experience.map((exp) => {
          return (
            <React.Fragment key={exp._id}>
              {" "}
              {isFetching ? (
                <Spinner
                  className="experience-spinner"
                  animation="grow"
                  role="status"
                ></Spinner>
              ) : (
                <div
                  className="experience"
                  onClick={() => setOpenOption(false)}
                >
                  {authorized && (
                    <div className="options position-absolute ">
                      <MoreVertRounded
                        className="icon"
                        onClick={() => setOpenOption(exp._id)}
                      />{" "}
                    </div>
                  )}
                  {openOption === exp._id && (
                    <div className="options-menu ">
                      <li className="edit ">Edit</li>
                      <li className="del" onClick={() => handleDelete(exp._id)}>
                        Delete
                      </li>
                      <li className="send-to-chat">Send to chat</li>
                      <CloseSharp
                        onClick={() => setOpenOption(null)}
                        className="close-option-menu"
                      />
                    </div>
                  )}
                  <h5 className="co-name">
                    <span className="preffix">Co</span> {exp.company}
                  </h5>
                  <div className="role">
                    <span className="preffix">Role</span> {exp.title}
                  </div>
                  <div className="role">
                    <span className="preffix">location</span> {exp.loc}
                  </div>
                  <div className="from">
                    <span className="preffix">From</span> {exp.from}
                  </div>
                  <div className="to">
                    <span className="preffix">To </span> {exp.to}
                  </div>
                  <div className="description-parent">
                    <h6> description </h6>
                    <p>{exp.description}</p>
                  </div>
                  <div className="col-12 experience-statement">
                    <button
                      className=" btn-sm btn btn-info"
                      onClick={() => setExpPdf(true)}
                    >
                      View pdf
                    </button>
                    <button
                      onClick={() => setExpPdf(true)}
                      className="btn-sm btn btn-success"
                    >
                      {" "}
                      Download pdf
                    </button>
                  </div>
                  {expPdf && (
                    <h6 className="text-primary no_statement-msg m-2 text-align-center">
                      {" "}
                      coming soon, we are sorry!
                    </h6>
                  )}
                </div>
              )}{" "}
            </React.Fragment>
          )
        })
      )}
    </>
  )
}

export default SingleExp;
