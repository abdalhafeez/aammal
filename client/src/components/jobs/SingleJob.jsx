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
   }, [isMounted])
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
         <div className="row single-job col-12 mt-5">
           {singleJob && (
             <div className="col-md-7 mx-auto col-ms-11 row job-details-parent">
               <header className=" col-12 row mb-5">
                 <div className="top row col-12 ">
                   <div className="co-info col-12 ">
                     <img src={PF + singleJob?.companyLogo} alt="logo" />
                     <h5>
                       <Link
                         to={`/company/${singleJob?.company}`}
                         className="link"
                       >
                         {" "}
                         {singleJob?.companyName}
                       </Link>
                     </h5>{" "}
                     <h6 className=" industry ms-auto">
                       {" "}
                       {singleJob?.industry}
                     </h6>
                   </div>
                 </div>{" "}
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
               <div className=" col-12 p-2 row details-parent ">
                 <div className="col-12 apply-and-title-parent">
                   <h3 className="text-center text-muted job-details-title">
                     Job Details
                   </h3>
                   <div className="button apply">Apply Now</div>
                 </div>
                 <div className="  col-11 mt-3 experience-needed">
                   <h6 className="title">Experience:</h6>
                   {singleJob?.experienceRequired}
                 </div>
                 <div className="  col-11 mt-3 education">
                   <h6 className="title">Education:</h6>
                   {singleJob?.educationRequired}
                 </div>{" "}
                 <div className="working-days col-11 mt-3">
                   <h6 className="title">Working Days</h6>

                   {singleJob?.workingDays?.map((day) => (
                     <li className="" key={day}>
                       {day}
                     </li>
                   ))}
                 </div>
                 <div className=" col-11 mt-3  perks">
                   <h6 className="title">entitlements and perks</h6>

                   {singleJob &&
                     singleJob?.perks?.map((p) => {
                       return <li key={p}> {p}</li>
                     })}
                 </div>
               </div>
               <div className="more-details  col-12 row pb-5">
                 <h2 className="text-center mt-5">More Details</h2>
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
             </div>
           )}
           <div className="col-sm-12 col-md-4 mx-auto row">
             <div
               className={` related-job 
               col-sm-12 col-md-12  row
                  ${window.innerWidth > 767 ? "sm-related-jobs" : ""}`}
             >
               <h4 className="text-center">Related Jobs</h4>
               <div className=" related-job card bg-light my-2 mx-auto col-sm-11 col-md-11">
                 <div className="head col-12">
                   <img src="" alt="logo" className="col-3" />
                   <span className="co-name text-primary col-7">
                     freecodecamp for web development
                   </span>
                 </div>
                 <div className="body">
                   <div className="job-title text-success">
                     {" "}
                     full stack web developer
                   </div>
                   <p className="desc text-muted">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Cupiditate, nisi.
                   </p>
                 </div>
               </div>
               <div className=" related-job card bg-light my-2 mx-auto col-sm-11 col-md-11">
                 <div className="head col-12">
                   <img src="" alt="logo" className="col-3" />
                   <span className="co-name text-primary col-7">
                     freecodecamp for web development
                   </span>
                 </div>
                 <div className="body">
                   <div className="job-title text-success">
                     {" "}
                     full stack web developer
                   </div>
                   <p className="desc text-muted">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Cupiditate, nisi.
                   </p>
                 </div>
               </div>
               <div className=" related-job card bg-light my-2 mx-auto col-sm-11 col-md-11">
                 <div className="head col-12">
                   <img src="" alt="logo" className="col-3" />
                   <span className="co-name text-primary col-7">
                     freecodecamp for web development
                   </span>
                 </div>
                 <div className="body">
                   <div className="job-title text-success">
                     {" "}
                     full stack web developer
                   </div>
                   <p className="desc text-muted">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Cupiditate, nisi.
                   </p>
                 </div>
               </div>
               <div className=" related-job card bg-light my-2 mx-auto col-sm-11 col-md-11">
                 <div className="head col-12">
                   <img src="" alt="logo" className="col-3" />
                   <span className="co-name text-primary col-7">
                     freecodecamp for web development
                   </span>
                 </div>
                 <div className="body">
                   <div className="job-title text-success">
                     {" "}
                     full stack web developer
                   </div>
                   <p className="desc text-muted">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Cupiditate, nisi.
                   </p>
                 </div>
               </div>
               <div className=" related-job card bg-light my-2 mx-auto col-sm-11 col-md-11">
                 <div className="head col-12">
                   <img src="" alt="logo" className="col-3" />
                   <span className="co-name text-primary col-7">
                     freecodecamp for web development
                   </span>
                 </div>
                 <div className="body">
                   <div className="job-title text-success">
                     {" "}
                     full stack web developer
                   </div>
                   <p className="desc text-muted">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Cupiditate, nisi.
                   </p>
                 </div>
               </div>
             </div>{" "}
             <div className="other-websites col-sm-11 col-md-12">
               <div className="website">
                 <div className="site-log">
                   <img src="" alt="logo" />
                 </div>
                 <div className="site-name">
                   <h4>LinkedIin</h4>
                   <div className="desc">
                     Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                     Est, ipsum?
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       )}
     </>
   )
}

export default SingleJob
