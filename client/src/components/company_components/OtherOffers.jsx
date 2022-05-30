import { useEffect, useState } from "react"
import { axiosInstance } from "../../config/axiosInstance"
function OtherOffers({ company }) {
  const [olderOffers, setOlderOffers] = useState([])
  useEffect(async () => {
    try {
      const res = await axiosInstance.get(`/jobs/company/${company?.name}`)
      setOlderOffers(res.data)
    } catch (error) {
      console.log(error.response)
    }
  }, [])
  return (
    <div className="company-bottom col-12 col-md-11 mx-auto mb-5 row">
      <h4 className="title">
        Other Offers from <span className="text-primary">Free Code Side</span>
      </h4>{" "}
      {olderOffers && (
        <>
          {olderOffers?.map((offer) => {
            return (
              <div className="old-offer col-md-4 col-11">
                <div class="card-body">
                  <h5 class="card-title">
                    <span className="remote">{offer?.place}</span>{" "}
                    {offer?.title}
                  </h5>
                  <h6 class="card-subtitle mb-2 text-success">
                    {offer?.salary} per month
                  </h6>
                  <p class="card-text">{offer?.description}</p>
                </div>
                <div className="actions align-items bg-light p-2">
                  <a href="#" class="btn btn-sm btn-info">
                    View Details
                  </a>
                  <a href="#" class="btn btn-sm btn-primary">
                    Apply
                  </a>
                </div>
              </div>
            )
          })}{" "}
        </>
      )}
    </div>
  )
}

export default OtherOffers
