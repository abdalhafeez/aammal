import React, { useState } from "react"
import { useContext } from "react"
import { Spinner } from "react-bootstrap"
import { companyContext } from "../../context/company_context/companyContext"
import { AddToProfile } from "../../api_Calls/companyCall"
import { authContext } from "../../context/auth_context/authContext"
function CreateCompany() {
  const [errors, setErrors] = useState([])
  const [loc, setLoc] = useState([])
  const [emails, setEmails] = useState([])
  const [phones, setPhones] = useState([])
  const [values, setValues] = useState("")
  const [about, setAbout] = useState("")
  const [area, setArea] = useState("")
  const { company, dispatch } = useContext(companyContext)
  const { user } = useContext(authContext)

  const EditProfileHandler = (e) => {
    e.preventDefault()
    const body = {
      name: user.userName,
      loc,
      values,
      about,
      contacts: {
        emails: emails.split(",").map((email) => email.trim()),
        phones: phones.split(",").map((phone) => phone.trim()),
      },
      about,
      area,
    }
    setLoc("")
    console.log(company)
    AddToProfile(body, dispatch)
    setTimeout(() => {
      //   setErrors([]);
    }, 5000)
  }

  return (
    <div className="col-12 add-new-job row">
      {false ? (
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
        <form
          className="add-job-form col-md-7 col-11"
          onSubmit={EditProfileHandler}
        >
          <div className="col-12">
            <label>Emails, </label>
            <input
              onChange={(e) => setEmails(e.target.value)}
              name="emails"
              placeholder="separate them with comma. e.g. A, b, C"
            />
          </div>
          <div className="col-12">
            <label>Phones </label>
            <input
              onChange={(e) => setPhones(e.target.value)}
              name="phones"
              placeholder="separate them with comma. e.g. 47787, 89787, 27867"
            />
          </div>

          <div className="col-12">
            <label>
              Location <br />
            </label>
            <input
              onChange={(e) => setLoc(e.target.value)}
              type="text"
              name="loc"
              placeholder="e.g Sudan, KSA, Egypt..."
            />{" "}
          </div>

          <div className="col-12 select-parent">
            <label>Industry</label>
            <select name="area" onChange={(e) => setArea(e.target.value)}>
              <option value="">choose</option>{" "}
              <option value="education">Education</option>{" "}
              <option value="Programming">programming</option>
              <option value="business">business</option>
            </select>
          </div>

          <div className="col-12 textarea-parent ">
            <label className="col-12 ">your company's values</label>
            <textarea
              onChange={(e) => setValues(e.target.value)}
              type="text"
              name="values"
            />
          </div>
          <div className="col-12 textarea-parent ">
            <label className="col-12 ">
              Write something about your company
            </label>
            <textarea
              onChange={(e) => setAbout(e.target.value)}
              type="text"
              name="about"
            />
          </div>
          <div className="errors">
            {/* {errors &&
              errors?.map((arr) => (
                <h5 className="text-center text-danger p-2" key={arr.msg}>
                  {arr.msg}
                </h5>
              ))} */}
          </div>
          <div className="col-12 action">
            {/* <button
              onClick={() => setAddJob(!addJob)}
              className="btn btn-sm btn-danger"
            >
              concel
            </button> */}
            <button className="btn btn-sm btn-success">Create Job</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default CreateCompany
