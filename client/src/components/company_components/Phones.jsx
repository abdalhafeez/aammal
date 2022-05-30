import PhoneCallback from "@material-ui/icons/PhoneCallback"
function Phones({ company }) {
  return (
    <>
      <PhoneCallback className="phone-icon" />
      {company &&
        company?.contacts?.phones?.map((phone) => {
          return (
            <a className="m-2 link" href={`tel:${phone}`} key={phone}>
              {phone}
            </a>
          )
        })}
    </>
  )
}

export default Phones
