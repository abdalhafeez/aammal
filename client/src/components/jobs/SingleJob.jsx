import "./styles/singleJob.css"
import React, { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
 
 
import { axiosInstance, PF } from "../../config/axiosInstance"
import { Spinner } from "react-bootstrap"
function SingleJob() {
  const [loading, setLoadng] = useState()
  const isMounted = useRef(false)
  const { pathname } = useLocation()
  const [singleJob, setSingleJob] = useState([])

  useEffect(() => {
    isMounted.current = true
    async function fetchData() {
      setLoadng(true)
      try {
        const res = await axiosInstance.get(`/jobs${pathname}`)
        if (isMounted.current) {
          res.data && setSingleJob(res.data)
          setLoadng(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    return () => {
      isMounted.current = false
    }
  }, [])
  console.log(singleJob)

  return (
    <>
      {loading ? (
        <div className="spinner-parent">
          <Spinner
            className="load-profile-spinner m-3"
            variant="primary"
            animation="border"
            role="status"
          ></Spinner>
          {/* create JS animatino */}
          <h4>Posting...</h4>
        </div>
      ) : (
        <div className=" row single-job col-12">
          {singleJob && (
            <>
              <header className=" col-12 row">
                <div className="details col-md-4 col-12">
                  <h1>Job Details </h1>{" "}
                  <h4 className=" industry"> {singleJob?.industry}</h4>
                </div>{" "}
                <div className="co-info col-12 col-md-6 ">
                  <img src={PF + singleJob?.companyLogo} alt="logo" />
                  <h5>
                    <Link to={`/company/${singleJob?.company}`}>
                      {" "}
                      {singleJob?.companyName}
                    </Link>
                  </h5>{" "}
                </div>
                <div className="title col-12 m-auto mt-2 row">
                  <h5 className="col-12">
                    <span className="text-primay">
                      <span className="work-place me-2">{`${singleJob?.place} - `}</span>{" "}
                      {singleJob?.shift}{" "}
                    </span>{" "}
                    {singleJob?.title} - <span>{singleJob?.shift} </span>
                  </h5>
                </div>
              </header>
              <div className=" col-11 p-2 row details-parent">
                <div className=" col-md-3 col-4 experience-needed">
                  <span>Experience</span>
                  <h6>{singleJob?.experienceRequired}</h6>
                </div>
                <div className=" col-md-3 col-7 education">
                  <h6 className="text-primary">Education</h6>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                </div>{" "}
                <div className="days-parent col-md-2 col-12">
                  <h6 className=" text-primary">Working Days</h6>
                  <div className="working-days row">
                    {singleJob?.workingDays?.map((day) => (
                      <li className="col-md-12 col-3">{day}</li>
                    ))}
                  </div>
                </div>
                <div className=" col-12 col-md-3 perks">
                  <h6 className="text-primary ">entitlements and perks</h6>
                  {singleJob &&
                    singleJob?.perks?.map((p) => {
                      return <li key={p}> {p}</li>
                    })}
                </div>
              </div>
              <div className="more-details  col-12 row pb-5">
                <h2 className="text-center text-white m-2">More Details</h2>
                <div className="left col-md-6 col-12">
                  <div className="description">
                    <h4>description</h4>
                    <p>{singleJob?.description}</p>
                  </div>
                </div>{" "}
                <div className="right col-md-5 col-12 ">
                  <h4>Recruitment process</h4>
                  <p>{singleJob?.recruitmentProcess}</p>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default SingleJob
