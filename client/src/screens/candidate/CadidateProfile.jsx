import "./candidateProfile.css"

import React, { useState, useContext } from "react"
import { EditSharp, InsertPhotoRounded } from "@material-ui/icons"
import { updateProfile, uploadProfilePhoto } from "../../api_Calls/profileCalls"
import { profileContext } from "../../context/profile_context/profileContext"
import { authContext } from "../../context/auth_context/authContext"
import { Spinner } from "react-bootstrap"
import { useEffect, useRef } from "react"
import Experience from "../../components/candidate_components/experience/Experience"
import Education from "../../components/candidate_components/education/Education"
import SocialMedia from "../../components/candidate_components/social_media/SocialMedia"
import { axiosInstance, PF } from "../../config/axiosInstance"
import { useLocation } from "react-router-dom"
const CadidateProfile = () => {
  const {
    dispatch,
    profile: currentProfile,
    isFetching,
  } = useContext(profileContext)
  const [editProfile, setEditProfile] = useState(false)
  const [bio, setBio] = useState("")
  const [title, setTitle] = useState("")
  const { user } = useContext(authContext)
  const isMounted = useRef(true)
  const [fetcher, setFetcher] = useState(false)
  const [profile, setProfile] = useState([])
  const { pathname } = useLocation()
  const id = pathname.split("/").pop()
  const body = { bio, title }
  const handleUpdate = (e) => {
    e.preventDefault()
    updateProfile(body, dispatch)
    setEditProfile(false)
    setFetcher(!fetcher)
  }
  useEffect(() => {
    isMounted.current = true
    async function fetchProfile() {
      try {
        const res = await axiosInstance.get(`/developersProfiles/` + id)
        if (isMounted.current) {
          res.data && setProfile(res.data)
        }
      } catch (error) {
        console.log(error.response)
      }
    }
    fetchProfile()
    return () => {
      isMounted.current = false
    }
  }, [fetcher])

  const handleUpload = (e) => {
    uploadProfilePhoto(e, profile, dispatch)
  }

  return (
    <>
      {isFetching ? (
        <div className="spinner-parent">
          <Spinner
            className="load-profile-spinner m-3"
            variant="primary"
            animation="border"
            role="status"
            setBoiUpdating
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          {/* create JS animatino */}
          <h3>Please wait ...</h3>
        </div>
      ) : (
        <div className="dev-profile  row">
          <h1 className=" text-center col-10">My Profile</h1>
          <div className="profile-info col-md-5 row">
            <div className="img-container">
              <img
                className="img-fluid profile-img"
                src={profile?.photo ? PF + profile?.photo : PF + user?.photo}
                alt=""
              />

              {isFetching ? (
                <Spinner
                  className="change-profile-photo-spinner"
                  animation="border"
                  role="status"
                ></Spinner>
              ) : (
                <label htmlFor="file-input">
                  {" "}
                  <InsertPhotoRounded className="change-profile-photo" />
                </label>
              )}

              <input //upload profile photo
                type="file"
                id="file-input"
                className="upload_profile-photo-input"
                onChange={handleUpload}
              />
            </div>
            <form
              className="profile-init-form col-11 mb-3 row"
              onSubmit={handleUpdate}
            >
              <>
                {isFetching ? (
                  <Spinner animation="grow" className="update-boi-spinner">
                    {" "}
                  </Spinner>
                ) : (
                  <>
                    <div className="user-name col-12">
                      <h6>{profile?.userName}</h6>
                      {!editProfile && (
                        <span
                          className=" edit-btn"
                          onClick={() => setEditProfile(true)}
                        >
                          <EditSharp />
                        </span>
                      )}
                      {editProfile ? (
                        <div className="col-12">
                          <label>what is your title?</label>
                          <input
                            autoFocus
                            className="w-100"
                            defaultValue={profile?.title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            name="title"
                          />
                        </div>
                      ) : (
                        <h4>{profile?.title}</h4>
                      )}
                    </div>
                    {editProfile ? (
                      <div className="col-12">
                        <label>write something about yourself </label>
                        <textarea
                          type="text"
                          name="bio"
                          defaultValue={profile?.bio}
                          onChange={(e) => setBio(e.target.value)}
                        />
                      </div>
                    ) : (
                      <div className="about-me-parent ">
                        <h5 className="about-me-title">about me</h5>
                        <p className="about-me">{profile?.bio}</p>
                      </div>
                    )}
                    {/* <Skills /> */}
                    {editProfile && (
                      <div className="edit-profile-actions-parent">
                        {profile?.title ? (
                          <button className="btn btn-primary btn-sm">
                            Add
                          </button>
                        ) : (
                          <button className="btn btn-primary btn-sm">
                            Update
                          </button>
                        )}

                        <span
                          className="btn btn-danger btn-sm"
                          onClick={() => setEditProfile(false)}
                        >
                          concel
                        </span>
                      </div>
                    )}
                  </>
                )}
              </>
            </form>

            <SocialMedia
              fetcher={fetcher}
              setFetcher={setFetcher}
              profile={profile}
              user={user}
            />
          </div>

          <div className="row col-12 col-md-7">
            <Experience
              fetcher={fetcher}
              setFetcher={setFetcher}
              profile={profile}
              user={user}
            />
            <Education
              user={user}
              profile={profile}
              fetcher={fetcher}
              setFetcher={setFetcher}
            />
          </div>

          {/* {res.data.education.length === 0 && <Education profile={profile} />} */}
        </div>
      )}
    </>
  )
}

export default CadidateProfile
