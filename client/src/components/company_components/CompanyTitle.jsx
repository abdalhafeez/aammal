import { useContext, useState } from "react"
import { CloseRounded, AddBox, Edit } from "@material-ui/icons"
import "./styles/header.css"
import { AddToProfile } from "../../api_Calls/companyCall"
import { companyContext } from "../../context/company_context/companyContext"
import CompanyName from "./CompanyName"
import { authContext } from "../../context/auth_context/authContext"
import NoValuesMsg from "./NoValuesMsg"
import Phones from "./Phones"
function CompanyTitle({ setShowOverlay, company, fetcher, setFetcher }) {
  const [showForm, setShowForm] = useState(false)
  const [values, setValues] = useState("")
  const { dispatch, company: currentCompany } = useContext(companyContext)
  const { user } = useContext(authContext)
  const body = {
    values,
  }
  const handleAddValues = (e) => {
    setFetcher(!fetcher)
    e.preventDefault()
    AddToProfile(body, dispatch)
    closeValuesFormHandler()
  }
  const openValuesFormHandler = () => {
    setShowOverlay(true)
    setShowForm(true)
  }
  const closeValuesFormHandler = () => {
    setShowOverlay(false)
    setShowForm(false)
  }
  const authorized = user?._id === company?.user

  return (
    <>
      {showForm && (
        <form className="add-values-form " onSubmit={handleAddValues}>
          <h6 className="text-success">Company's Values</h6>

          <CloseRounded
            className="close-values-form"
            onClick={closeValuesFormHandler}
          />
          {/* <label>Write The Values of your Company</label> */}

          <textarea
            name="values"
            cols="30"
            defaultValue={company?.values}
            onChange={(e) => setValues(e.target.value)}
            rows="10"
          />
          <input
            type="submit"
            value="Add Values"
            className="btn btn-success btn-sm add-value-submit"
          />
        </form>
      )}
      <div className=" company-logo col-12 col-md-4 row">
        <CompanyName
          fetcher={fetcher}
          setFetcher={setFetcher}
          company={company}
          setShowOverlay={setShowOverlay}
        />
        {/* value form */}

        <div className="moto col-12 row">
          <div className="header col-12 row">
            <h6 className="col-9">Our Values and Vistion</h6>
          </div>
          <div className="settings-box col-3">
            {authorized && (
              <>
                {!company?.values ? (
                  <AddBox
                    className="settings-icon"
                    onClick={openValuesFormHandler}
                  />
                ) : (
                  <Edit
                    className="settings-icon"
                    onClick={openValuesFormHandler}
                  />
                )}
              </>
            )}
          </div>
          {!company?.values && authorized ? (
            <NoValuesMsg />
          ) : (
            <>
              {company?.values && (
                <p className="moto-body col-12">{company?.values}</p>
              )}
            </>
          )}
          {!authorized && !company?.values && (
            <>
              <h5 className="text-danger text-center my-5">
                {" "}
                <span className="text-primary"> {company?.name}</span> Did add
                their values yet.
              </h5>
              please contact them: <Phones />
            </>
          )}
        </div>
      </div>{" "}
    </>
  )
}

export default CompanyTitle
