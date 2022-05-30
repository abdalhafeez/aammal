import "./styles/latestOffer.css"
import React, { useEffect, useState } from "react"
import { axiosInstance } from "../../config/axiosInstance"
function LatestOffer({ company }) {
  const [lastestOffer] = useState({})
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosInstance.get(`/jobs/company/${company?.name}`)
        lastestOffer(res.data)
      } catch (error) {
        if (error) {
          console.log(error.response)
        }
      }
    }
    fetchData()
  }, [company, lastestOffer])
  return (
    <div className="latest-offer col-12 col-md-7">
      <>
        <div className="card-body">
          <h5 className="card-title">Full Stack web developer</h5>
          <h6 className="card-subtitle mb-2 text-success">10K per month</h6>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content. Some quick example text to build on the
            card title and make up the bulk of the card's content.
          </p>
        </div>
        <div className="actions align-items bg-light p-2">
          <a href="#" className="btn btn-sm btn-info">
            View Details
          </a>
          <a href="#" className="btn btn-sm btn-primary">
            Apply
          </a>
        </div>
      </>
    </div>
  )
}

export default LatestOffer
