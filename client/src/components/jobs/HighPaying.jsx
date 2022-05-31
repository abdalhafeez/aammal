import "./styles/hightPayingJobs.css";
import { useState, useRef, useEffect } from "react";

import { profiles } from "../../api_Calls/profiles"
import { axiosInstance } from "../../config/axiosInstance"
import { Spinner } from "react-bootstrap"
import { Link } from "react-router-dom"

const TopProfiles = ({ profile }) => {
  const [loadingJobs, setLoadingJobs] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliding, setSliding] = useState(true)
  const [sliderWidth, setSliderWidth] = useState(0)

  const [highPayingJobs, setHighPayingJobs] = useState(0)
  let widthRef = useRef()
  useEffect(() => {
    async function fetchHighPayJobs() {
      setLoadingJobs(true)
      try {
        const res = await axiosInstance.get("/jobs/hightPaying")
        setHighPayingJobs(res.data)
        setLoadingJobs(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchHighPayJobs()
  }, [])
  useEffect(() => {
    setSliderWidth(widthRef?.current?.offsetWidth)
    if (sliding) {
      const slide = setInterval(() => {
        if (currentSlide === 0) {
          setCurrentSlide(currentSlide + 1)
        }
        if (currentSlide < highPayingJobs.length - 1) {
          setCurrentSlide(currentSlide + 1)
        }
        if (currentSlide === highPayingJobs.length - 1) {
          setCurrentSlide(0)
        }
        clearInterval(slide)
      }, 5000)
    }
  }, [currentSlide])
   return (
     <div className="high-paying-jobs-parent col-md-7 col-12 m-auto   mt-2 ">
       <h4 className="text-center high-paying-jobs-title">High Paying Jobs</h4>
       <div className="slider ">
         {loadingJobs && (
           <Spinner
             className=" slider-spinner col-12"
             animation="grow"
             role="status"
           />
         )}
         {highPayingJobs &&
           highPayingJobs?.map((job) => {
             return (
               // slide
               <div
                 ref={widthRef}
                 className=" slide col-12 p-2  "
                 style={{
                   transform: `translateX(-${currentSlide * sliderWidth}px)`,
                 }}
                 key={job._id}
               >
                 <div className="row col-12">
                   <header className="col-12 ">
                     <div className="company-info ">
                       <img
                         src={profile}
                         alt="profile-img "
                         className="hight-pay-job-img"
                       />
                     </div>{" "}
                     <div className=" ">
                       <span className="text-primary">{job?.shift} - </span>
                       <span className="high-pay-job-title">{job?.title}</span>
                       <span className="text-success ">{`- $${job?.salary}`}</span>
                     </div>
                   </header>
                   <Link to={`/company/${job.company}`} className="link">
                     <h5 className="m-2 text-primary">{job?.companyName} </h5>
                   </Link>
                   <div className=" col-12"></div>
                   <p className="High-paying-job-description">
                     {job?.description?.split(" ").slice(0, 30).join(" ")}{" "}
                     <span className="text-primary">...</span>
                   </p>
                 </div>
                 <div className="col-12 align-items">
                   <Link to={`/job/${job._id}`}>
                     <button className="btn btn-primary  btn-sm">
                       View Details
                     </button>
                   </Link>
                   <Link to={`/apply/${job._id}`}>
                     <button className="btn btn-outline-info btn-sm">
                       Apply
                     </button>
                   </Link>
                 </div>
                 {/* <div className="card-body ">{}</div> */}
               </div>
             )
           })}
       </div>
     </div>
   )
}

export default TopProfiles;
