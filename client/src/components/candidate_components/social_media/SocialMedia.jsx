import "./socialMedia.css";
import {
  Facebook,
  Instagram,
  Twitter,
  YouTube,
  AddBox,
  GitHub,
  LinkedIn,
} from "@material-ui/icons"
import { useState } from "react"
import { axiosInstance } from "../../../config/axiosInstance"
function SocialMedia({ profile, authorized }) {
  const [showForm, setShowFrom] = useState(false)
  const [linkedIn, setLinkedIn] = useState("")
  const [GitHubUserName, setGitHubUserName] = useState("")
  const [twitter, setTwitter] = useState("")
  const [socialLinks, setSocialLinks] = useState(profile.social)

  const addLinkhandler = async (e) => {
    const config = {
      headers: {
        "Context-Type": "application/json",
      },
    }
    e.preventDefault()
    const body = {
      linkedIn,
      GitHubUserName,
      twitter,
    }
    try {
      const res = await axiosInstance.put(
        "/developersProfiles/social",
        body,
        config
      )
      if (res.data) {
        setShowFrom(false)
        setSocialLinks(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(authorized)
  return (
    <div className="social-media align-items col-10 bs p-2 position-relative row mb-5">
      {authorized ? (
        <>
          {" "}
          <span>
            Add your socal media links{" "}
            <AddBox
              onClick={() => setShowFrom(true)}
              className="settings-icon icon-to-open"
            />
          </span>
          <>
            <h6 className="col-12 text-center text-primary mb-3">
              check me on:
            </h6>
            {!showForm && (
              <AddBox
                onClick={() => setShowFrom(true)}
                className="settings-icon icon-to-open"
              />
            )}
          </>
        </>
      ) : (
        <h4 className="text-primary">No Socail Media Links</h4>
      )}

      {showForm && (
        <form className="media-link row my-3" onSubmit={addLinkhandler}>
          <div className="col-12 ">
            <label>
              {" "}
              <Twitter className="social-media-icon col-4 twitter" />
            </label>
            <input
              autoFocus
              placeholder="paste a link. e.g www.twitter.com/userName"
              onChange={(e) => setTwitter(e.target.value)}
              name="twitter"
              className=" m-2 p-1"
              type="text"
            />
          </div>
          <div className="col-12 ">
            <label>
              {" "}
              <GitHub className="social-media-icon col-4 github" />
            </label>
            <input
              autoFocus
              placeholder="paste a link. e.g www.github.com/userName"
              onChange={(e) => setGitHubUserName(e.target.value)}
              name="GitHubUserNam"
              className=" m-2 p-1"
              type="text"
            />
          </div>
          <div className="col-12 ">
            <label>
              {" "}
              <LinkedIn className="social-media-icon linkedIn" />
            </label>
            <input
              autoFocus
              placeholder="paste a link. e.g www.twitter.com/userName"
              onChange={(e) => setTwitter(e.target.value)}
              name="twitter"
              className=" m-2 p-1"
              type="text"
            />
          </div>

          <div className="actions align-items my-3">
            <span
              className="btn btn-sn btn-danger"
              onClick={() => setShowFrom(false)}
            >
              Concel
            </span>
            <button className="btn btn-sm btn-info">Submit</button>
          </div>
        </form>
      )}
      <ul className=" align-items col-12 m-auto row">
        {socialLinks?.map((link) => (
          <>
            {console.log(link.GitHubUserName)}
            <a
              className="col-4 "
              href={link.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <LinkedIn className="social-media-icon  linkedIn" />
            </a>
            <a
              className="col-4 "
              href={link.GitHubUserName}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <GitHub
                className="social-media-icon   github"
                onClick={() => {
                  window.open(link.GitHubUserName)
                }}
              />
            </a>
            <a
              className="col-4 "
              href={link.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="social-media-icon twitter" />
            </a>
          </>
        ))}
      </ul>
    </div>
  )
}

export default SocialMedia;
