import React, { useState } from "react";
import "./experience.css";
import AddBox from "@material-ui/icons/AddBox";
import SingleExp from "./SingleExp";
import { useContext } from "react";
import { profileContext } from "../../../context/profile_context/profileContext";
import { addExperince } from "../../../api_Calls/profileCalls";
function Experience({ profile, user }) {
  const {
    dispatch,
    profile: currentProfile,
    profileErrors,
  } = useContext(profileContext)
  const [addExp, setAddExp] = useState(false)
  const [company, setCompany] = useState("")
  const [title, setTitle] = useState("")
  const [from, setFrom] = useState("")
  const [loc, setLoc] = useState("")
  const [to, setTo] = useState("")
  const [stillWorking] = useState(false)
  const [description, setDescription] = useState("")
  const body = {
    stillWorking,
    company,
    loc,
    title,
    from,
    to,
    description,
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    addExperince(body, dispatch)
    setCompany("")
    setDescription("")
    setTitle("")
    setFrom("")
    setTo("")
    setLoc("")
    setAddExp(!addExp)
  }
  let adding = (
    <span onClick={() => setAddExp(!addExp)} className="add-exp-parent mb-1">
      Add <AddBox onClick={() => setAddExp(!addExp)} className="add-edu" />
    </span>
  )

  return (
    <div className="experience-parent mt-2 col-12 m-auto row">
      <div className="exp-header">
        <h3 className="experience-title">My Experiences</h3>
        {profile?.experience?.length > 0 && adding}
      </div>
      {addExp && ( //   @styled with in educatin.css
        <form
          className="education-form col-11 row"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className="col-12">
            <label className="col-3 ">company</label>
            <input
              onChange={(e) => setCompany(e.target.value)}
              className="col-8 "
              type="text"
              name="company"
              required
            />
          </div>
          <div className="col-12">
            <label className="col-3 ">location</label>
            <input
              onChange={(e) => setLoc(e.target.value)}
              className="col-8 "
              type="text"
              name="loc"
              required
              placeholder="where was the compnay based?"
            />
          </div>
          <div className="col-12">
            <label className="col-3 ">Title</label>
            <input
              required
              onChange={(e) => setTitle(e.target.value)}
              className="col-8 "
              type="text"
              name="title"
              placeholder="what role you had?"
            />
          </div>

          <div className="col-12">
            <label className="col-3 ">From</label>
            <input
              required
              onChange={(e) => setFrom(e.target.value)}
              className="col-8 "
              type="date"
              name="form"
            />
          </div>
          <div className="col-12">
            <label className="col-3 ">To</label>
            <input
              onChange={(e) => setTo(e.target.value)}
              className="col-8 "
              type="date"
              name="to"
            />
            {/* <span className="toggler">
              <span className="toggle">working</span>
            </span> */}
          </div>

          <div className="col-12 row">
            <label className="col-12 ">Description</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="col-12 "
              type="text"
              name="description"
            />
          </div>
          <div className="col-12 action">
            <input
              value={"add Experience"}
              className="btn btn-sm btn-success adding-btn"
              type="submit"
            />
            <button
              onClick={() => setAddExp(!addExp)}
              className="btn btn-sm btn-danger"
            >
              concel
            </button>
          </div>
          {profileErrors &&
            profileErrors.map((arr) => (
              <h5 className="text-center text-danger p-2" key={arr.msg}>
                {arr.msg}
              </h5>
            ))}
        </form>
      )}

      {/* ################### */}
      {/* ################### */}

      <SingleExp setAddExp={setAddExp} addExp={addExp} adding={adding} />
    </div>
  )
}

export default Experience;
