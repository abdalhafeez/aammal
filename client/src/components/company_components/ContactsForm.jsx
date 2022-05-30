import CloseRounded from "@material-ui/icons/CloseRounded"
import { useState } from "react"

function ContactsForm({
  setEmails,
  setPhones,
  company,
  closeContactsForm,
  addContactsHandler,
}) {
  return (
    <form className="contacts-form" onSubmit={addContactsHandler}>
      {/* autoComplete="off" */}
      <CloseRounded className="close-values-form" onClick={closeContactsForm} />
      <label className="text-success">your company's Contacts</label>
      <small className="text-muted note">
        <span className="title"> Note* </span> separate emails and phones with
        comma e.g. x@gmail.com, y@gmail.com.
      </small>
      <label> Phones</label>
      <input
        type="text"
        name="phones"
        required
        className="text-center"
        defaultValue={company?.contacts?.phones?.map((phone) => {
          return phone
        })}
        onChange={(e) => setPhones(e.target.value)}
        placeholder="965717288, 6993387396"
      />
      <label>Emails </label>
      <input
        type="text"
        className="text-center"
        defaultValue={company?.contacts?.emails?.map((email) => {
          return email
        })}
        onChange={(e) => setEmails(e.target.value)}
        name="emails"
        required
        placeholder="something@gmail.com"
      />
      <button className="btn btn-sm btn-success m-2">Add Contacts</button>
    </form>
  )
}

export default ContactsForm
