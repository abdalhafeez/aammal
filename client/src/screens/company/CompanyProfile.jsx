import "./company.css";
 import CompanyHeader from "../../components/company_components/CompanyHeader"
 import CompanyMiddle from "../../components/company_components/CompanyMiddle"
import { useLocation } from "react-router-dom"
import { axiosInstance } from "../../config/axiosInstance"
import { useState, useEffect } from "react"
import CompanyBottom from "../../components/company_components/CompanyBottom"

function CompanyProfile({ showOverlay, setShowOverlay }) {
  const [loading, setLoading] = useState(false)
  const [company, setCompany] = useState(null)
  const [fetcher, setFetcher] = useState(false)

  const { pathname } = useLocation()
  const id = pathname.split("/")[2]
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const res = await axiosInstance.get("/companiesProfiles/" + id)
        res.data && setCompany(res.data)
        res.data && setLoading(false)
      } catch (error) {
        console.log(error.response)
      }
    }
    fetchData()
  }, [fetcher])
  return (
    <div className=" profile-parent">
      <div className="co-profile row ">
        {showOverlay && <div className="overlay"> </div>}
        <CompanyHeader
          fetcher={fetcher}
          setFetcher={setFetcher}
          company={company}
          showOverlay={showOverlay}
          setShowOverlay={setShowOverlay}
          loading={loading}
          setLoading={setLoading}
        />

        <CompanyMiddle
          fetcher={fetcher}
          setFetcher={setFetcher}
          company={company}
          showOverlay={showOverlay}
          setShowOverlay={setShowOverlay}
          loading={loading}
          setLoading={setLoading}
        />
        <CompanyBottom
          fetcher={fetcher}
          setFetcher={setFetcher}
          company={company}
          showOverlay={showOverlay}
          setShowOverlay={setShowOverlay}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </div>
  )
}

export default CompanyProfile;
