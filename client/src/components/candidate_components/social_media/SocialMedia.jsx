import "./socialMedia.css";
import {
  Facebook,
  Instagram,
  Twitter,
  YouTube,
  AddBox,
} from "@material-ui/icons"
import { useState } from "react"
import { axiosInstance } from "../../../config/axiosInstance"
function SocialMedia({ profile }) {
  const [showForm, setShowFrom] = useState(false)
  const [link, setLink] = useState("")
  const addLinkhandler = async (e) => {
    const config = {
      headers: {
        "Context-Type": "application/json",
      },
    }
    e.preventDefault()
    const body = {
      link,
    }
    try {
      const res = await axiosInstance.put(
        "/developersProfiles/social",
        body,
        config
      )
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="social-media align-items col-12 bs p-2 position-relative">
      <h6 className="text-center text-primary mb-3">check me on:</h6>
      {!showForm && (
        <AddBox
          onClick={() => setShowFrom(true)}
          className="settings-icon icon-to-open"
        />
      )}
      {showForm && (
        <form className="media-link row my-3" onSubmit={addLinkhandler}>
          <div className="col-12 align-items ">
            <label>link</label>
            <input
              autoFocus
              placeholder="paste a link. e.g www.facebook/me.com"
              onChange={(e) => setLink(e.target.value)}
              name="link"
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
      <ul className=" align-items">
        <Facebook className="social-media-icon f" />
        <YouTube className="social-media-icon y" />
        <Twitter className="social-media-icon t" />
        <Instagram className="social-media-icon tel" />
      </ul>
    </div>
  )
}

export default SocialMedia;
