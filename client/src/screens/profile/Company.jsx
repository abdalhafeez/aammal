import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import CompanyProfile from "../company/CompanyProfile"
import { axiosInstance } from "../../config/axiosInstance"
function Company({ showOverlay, setShowOverlay }) {
  const [company, setCompany] = useState(null)
  const { pathname } = useLocation()
  const id = pathname.split("/").pop()
  useEffect(() => {
    async function fetchCo() {
      try {
        const response = await axiosInstance.get(`/companiesProfiles/${id}`)
        setCompany(response.data)
      } catch (error) {
        // console.log(error.response)
      }
    }
    fetchCo()
  }, [])
  // console.log("company: ", company)
  return (
    <CompanyProfile
      company={company}
      showOverlay={showOverlay}
      setShowOverlay={setShowOverlay}
    />
  )
}

export default Company
