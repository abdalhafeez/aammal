import "./apply.css"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"

function JobApplication() {
  const isMounted = useRef(false)
  // const { job, dispatch } = useContext(jobContext)
  const { pathname } = useLocation()
  const [jobToAppyTo, setSingleJob] = useState([])

  useEffect(() => {
    isMounted.current = true
    async function fetchData() {
      try {
        const res = await axios.get(`/jobs/job/${pathname.split("/").pop()}`)
        if (isMounted.current) {
          res.data && setSingleJob(res.data)
        }
      } catch (error) {
        console.log(error.response.data)
      }
    }
    fetchData()
    return () => {
      isMounted.current = false
    }
  }, [])
  console.log(jobToAppyTo)
  return (
    <div className="job-application col-12">
      <h1 className="text-info">coming soon!</h1>
    </div>
  )
}

export default JobApplication
