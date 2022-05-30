import EmailOutlined from "@material-ui/icons/EmailOutlined"

function Emails({ company }) {
  return (
    <>
      <EmailOutlined className="email-icon" />
      {company &&
        company?.contacts?.emails?.map((email) => {
          return (
            <span key={email}>
              <a className="link" href={`mailto:${email}`}>
                {email}
              </a>
            </span>
          )
        })}
    </>
  )
}

export default Emails
