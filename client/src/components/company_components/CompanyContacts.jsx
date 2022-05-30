import "./styles/contacts.css"
import AddBoxOutlined from "@material-ui/icons/AddBoxOutlined"
import Edit from "@material-ui/icons/Edit"
 
import { companyContext } from "../../context/company_context/companyContext"
import { AddToProfile } from "../../api_Calls/companyCall"
import { useContext, useState } from "react"
import { authContext } from "../../context/auth_context/authContext"

import Phones from "./Phones"
import NoPhonesMsg from "./NoPhonesMsg"
import ContactsForm from "./ContactsForm"
import Emails from "./Emails"
function CompanyContacts({ setShowOverlay, company, fetcher, setFetcher }) {
  const [phones, setPhones] = useState([])
  const [emails, setEmails] = useState([])
  const [showForm, setShowForm] = useState(false)
  const { user } = useContext(authContext)
  const { dispatch, company: currentCompany } = useContext(companyContext)

  const addContactsHandler = (e) => {
    setFetcher(!fetcher)

    e.preventDefault()
    const body = {
      contacts: {
        emails: emails.split(",").map((email) => email.trim()),
        phones: phones.split(",").map((phone) => phone.trim()),
      },
    }
    AddToProfile(body, dispatch)
    closeContactsForm()
  }
  const closeContactsForm = () => {
    setShowOverlay(false)
    setShowForm(false)
  }
  const showContactsForm = () => {
    console.log(showForm)
    setShowForm(true)
    setShowOverlay(true)
  }
  const authorized = user?._id === company?.user
  return (
    <div className="contacts col-12  row">
      {company?.contacts?.emails < 1 || company?.contacts?.phones < 1 ? (
        <>
          {authorized ? (
            <div className="text-center small">
              Please add the phone and emails of your company..{" "}
              <AddBoxOutlined
                className="contacts-icon position-static"
                onClick={showContactsForm}
              />
            </div>
          ) : (
            <div className="text-center spacing">
              <span className="text-success"> {company && company?.name}</span>{" "}
              Did't Add Any Contacts!
            </div>
          )}
          <NoPhonesMsg />
        </>
      ) : (
        <>
          <div className="contacts-container col-12 row">
            {/* <span>
            </span> */}
            <div className="phone col-md-6 col-12">
              <Phones company={company} />
            </div>
            <div className="email col-md-5 col-12">
              <Emails company={company} />
            </div>
            {authorized && (
              <Edit
                className="settings-icon  icon-to-open"
                onClick={showContactsForm}
              />
            )}
          </div>
        </>
      )}

      {showForm && (
        <ContactsForm
          company={company}
          setEmails={setEmails}
          closeContactsForm={closeContactsForm}
          setPhones={setPhones}
          addContactsHandler={addContactsHandler}
        />
      )}
    </div>
  )
}

export default CompanyContacts
