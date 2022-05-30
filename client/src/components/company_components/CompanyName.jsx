import { useContext, useState } from "react"
import { companyContext } from "../../context/company_context/companyContext"
import logo from "../../assets/logo.jpg"
import "./styles/name.css"
import { PF } from "../../config/axiosInstance"
function CompanyName({ company }) {
  return (
    <div className="col-12 row company-name">
      <img src={PF + company?.logo} alt="logo" className="logo col-3 " />

      <div className="name comapny-title col-8">
        <>
          <h5 className="company-title">{company && company.name}</h5>
        </>
      </div>
    </div>
  )
}

export default CompanyName
